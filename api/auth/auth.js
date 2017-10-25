'use strict';

var JWT = require('jsonwebtoken');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

var User = require('../models/user.model'); 
var Client = require('../models/client.model');
var AccessToken = require('../models/accessToken.model');
var RefreshToken = require('../models/refreshToken.model');
var config = require('../../config/config');

/**
 * These strategies are used to authenticate registered OAuth clients.
 * The authentication data may be delivered using the basic authentication scheme (recommended)
 * or the client strategy, which means that the authentication data is in the body of the request.
 */

passport.use("clientBasic", new BasicStrategy(
    function(username, password, callback) {
        Client.findOne({ clientId: username }, function(err, client) {
            if (err) { 
            	return callback(err); 
            }

            if (!client) { 
            	return callback(null, false); 
            }

            if (!client.isTrusted) {
                return callback(null, false);
            } 

            if (client.clientSecret == password) { 
            	return callback(null, client); 
            } else
                return callback(null, false);
        });
    }
));

passport.use("clientPassword", new ClientPasswordStrategy(
    function(clientId, clientSecret, callback) {
        Client.findOne({ clientId: clientId }, function(err, client) {
            if (err) { 
            	return callback(err); 
            }

            if (!client) { 
            	return callback(null, false); 
            }

            if (!client.isTrusted) {
                return callback(null, false);
            } 

            if (client.clientSecret == clientSecret) { 
            	return callback(null, client); 
            } else
                return callback(null, false);
        });
    }
));


/**
 * This strategy is used to authenticate users based on an access token (aka a
 * bearer token).
 */

passport.use("accessToken", new BearerStrategy(
    function(accessToken, callback) {
        var options = {
            algorithms: ['HS256'],  // HMAC using SHA-256 hash algorithm
            expiresIn: config.get('security:JWT_ACCESS_TOKEN_EXPIRY_SECONDS')  // token life
        };

        JWT.verify(accessToken, config.get('security:JWT_SECRET_FOR_ACCESS_TOKEN'), options, function(err, decoded) {
            if (err) { 
            	return callback(err); 
            }

            AccessToken.findOne({ accessToken: decoded.token}, function(err, token) {
		        if (err) { 
			        return callback(err); 
		        }

		        if (!token) { 
			        return callback(null, false); 
		        }

                if (new Date() > token.accessTokenExpiresOn) {
                    AccessToken.remove({ accessToken: token }, function (err) {
                        if (err) {
                    	    return callback(err);
                        } 
                    });
                    return callback(null, false, { message: 'Token expired' });
                } else {
                    User.findById(token.userId, function(err, user) {
			            if (err) { return callback(err); }
			            if (!user) { return callback(null, false, { message: 'User not found' }); }
                        // no use of scopes for now
                        var info = { scope: '*' }
                        callback(null, user, info);
                    });
                }
            });
        });
    }));
		

