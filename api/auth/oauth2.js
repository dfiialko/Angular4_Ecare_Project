'use strict';

var oauth2orize = require('oauth2orize');
var passport = require('passport');
var JWT = require('jsonwebtoken');
var User = require('../models/user.model'); 
var RefreshToken = require('../models/refreshToken.model');
var AccessToken = require('../models/accessToken.model');

var log = require('../../log')(module);
var config = require('../../config/config');
var utils = require('../helpers/utils');

// create OAuth 2.0 server
var oauthserver = oauth2orize.createServer();

// generateTokens
// This generateTokens implementation generates a new access token and refresh token with JWT.
// the token output is the Base64 encoded string.
var generateToken = function (data, callback) {
    
    //Remove old tokens
    RefreshToken.remove(data, function(err) {
      if (err) return callback(err);
    });

    AccessToken.remove(data, function( err) {
         if (err) return callback(err);
    });

    //Create and save new tokens
    var accessTokenValue = utils.uid(256);
    var refreshTokenValue = utils.uid(256);

    var options = {
        algorithm: 'HS256',  // HMAC using SHA-256 hash algorithm
        expiresIn: config.get('security:JWT_ACCESS_TOKEN_EXPIRY_SECONDS')  // token life
    };

    var payload = {
        token: accessTokenValue,  // token value
        issuer: config.get('security:JWT_ISSUER')  // issuer
    };

    var signedAccessToken = JWT.sign(payload, config.get('security:JWT_SECRET_FOR_ACCESS_TOKEN'), options);

    payload = {
        token: refreshTokenValue,  // token value
        issuer: config.get('security:JWT_ISSUER')  // issuer
    };
    var signedRefreshToken = JWT.sign(payload, config.get('security:JWT_SECRET_FOR_REFRESH_TOKEN'), options);

    var exp = new Date(new Date().getTime() + (config.get('security:JWT_ACCESS_TOKEN_EXPIRY_SECONDS') * 1000));

    data.accessToken = accessTokenValue;
    data.accessTokenExpiresOn =exp;
    var newAccessToken = new AccessToken(data);

    data.refreshToken = refreshTokenValue;
    var newRefreshToken = new RefreshToken(data);

    newAccessToken.save(function (err) {
        if (err) { return callback(err); }

        newRefreshToken.save(function(err) {
            if (err) return callback(err);
            
            callback(null, signedAccessToken, signedRefreshToken, { 'expires_in': config.get('security:JWT_ACCESS_TOKEN_EXPIRY_SECONDS')});
        });
   	
    });

};


// Exchange username & password for an access token.
oauthserver.exchange(oauth2orize.exchange.password(function(client, username, password, scope, callback) {
	log.info("Exchange username & password for access token");

	User.findOne({ username: username }, function(err, user) {
		if (err) { 
			return callback(err); 
		}
		
		if (!user) {
          	return callback(null, false, { message: 'Incorrect username.' });
		}

        user.validPassword(password, function(err, isMatch) {		
            if(err) return callback(err);			
			if(!isMatch) return callback(null, false, { message: 'Incorrect password.' });	
            	
		});

		var model = { 
			userId: user.userId, 
			clientId: client.clientId
 		};

		generateToken(model, callback);
	});

}));


// Exchange refreshToken for access token.
oauthserver.exchange(oauth2orize.exchange.refreshToken(function(client, refreshToken, scope, callback) {
    //JWT.verify(bearerToken, JWT_SECRET_FOR_REFRESH_TOKEN, function(err, decoded) {
    var options = {
        algorithms: ['HS256'],  // HMAC using SHA-256 hash algorithm
        expiresIn: config.get('security:JWT_ACCESS_TOKEN_EXPIRY_SECONDS')  // token life
    };

    var payload = {
        token: refreshToken,  // token value
        issuer: config.get('security:JWT_ISSUER')  // issuer
    };

   JWT.verify(refreshToken, config.get('security:JWT_SECRET_FOR_REFRESH_TOKEN'), options, function(err, decoded) {
        if (err) { 
           	return callback(err); 
        }

        RefreshToken.findOne({ refreshToken: decoded.token, clientId: client.clientId }, function(err, token) {
            if (err) { 
                return callback(err); 
            }

            if (!token) { 
                return callback(null, false); 
            }

            if (client.clientId !== token.clientId) {
                return callback(null, false)
            }

            User.findById(token.userId, function(err, user) {
                if (err) { return callback(err); }
                if (!user) { return callback(null, false); }

                var model = { 
                    userId: user.userId, 
                    clientId: client.clientId
                };

                generateToken(model, callback);
            });
        });
   });
}));


// token endpoint
//
// `token` middleware handles client requests to exchange authorization grants
// for access tokens.  Based on the grant type being exchanged, the above
// exchange middleware will be invoked to handle the request.  Clients must
// authenticate when making requests to this endpoint.

exports.token = [
	passport.authenticate(['clientBasic', 'clientPassword'], { session: false }),
	oauthserver.token(),
    oauthserver.errorHandler()
];
