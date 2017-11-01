'use strict';

var JWT = require('jsonwebtoken');
var User = require('../user/user.model'); 
var Client = require('../models/client.model');
var Access = require('../models/client.model');
var Refresh = require('../models/client.model');

var model = module.exports;

//Place this in env variables/ config file
var JWT_ISSUER = 'e-CareSart API';
var JWT_SECRET_FOR_ACCESS_TOKEN = 'XT6PRpRuehFsyMa2';
var JWT_SECRET_FOR_REFRESH_TOKEN = 'JWPVzFWkqGxoE2C2';

// the expiry times should be consistent between the oauth2-server settings
// and the JWT settings (not essential, but makes sense)
model.JWT_ACCESS_TOKEN_EXPIRY_SECONDS = 1800;             // 30 minutes
model.JWT_REFRESH_TOKEN_EXPIRY_SECONDS = 1209600;         // 14 days


// Functions required to implement the model for oauth2-server

// generateToken
// This generateToken implementation generates a token with JWT.
// the token output is the Base64 encoded string.
model.generateToken = function(type, req, callback) {
  var token;
  var secret;
  var user = req.user;
  var exp = new Date();
  var payload = {
    // public claims
    iss: JWT_ISSUER,   // issuer
    //    exp: exp,        // the expiry date is set below - expiry depends on type
    //    jti: '',         // unique id for this token - needed if we keep an store of issued tokens?
    // private claims
    userId: user.id
  };
  var options = {
    algorithms: ['HS256']  // HMAC using SHA-256 hash algorithm
  };

  if (type === 'accessToken') {
    secret = JWT_SECRET_FOR_ACCESS_TOKEN;
    exp.setSeconds(exp.getSeconds() + model.JWT_ACCESS_TOKEN_EXPIRY_SECONDS);
  } else {
    secret = JWT_SECRET_FOR_REFRESH_TOKEN;
    exp.setSeconds(exp.getSeconds() + model.JWT_REFRESH_TOKEN_EXPIRY_SECONDS);
  }
  payload.exp = exp.getTime();

  token = JWT.sign(payload, secret, options);

  callback(false, token);
};


// The bearer token is a JWT, so we decrypt and verify it. We get a reference to the
// user in this function which oauth2-server puts into the req object
model.getAccessToken = function (bearerToken, callback) {

  return JWT.verify(bearerToken, JWT_SECRET_FOR_ACCESS_TOKEN, function(err, decoded) {

    if (err) {
      return callback(err, false);   // the err contains JWT error data
    }

    // other verifications could be performed here
    // eg. that the jti is valid

    // we could pass the payload straight out we use an object with the
    // mandatory keys expected by oauth2-server, plus any other private
    // claims that are useful
    return callback(false, {
      expires: new Date(decoded.exp),
      user: getUserById(decoded.userId)
    });
  });
};


//As we're using JWT there's no need to store the token after it's generated
model.saveAccessToken = function (accessToken, clientId, expires, userId, callback) {
  //if (err) {
   //   return callback(err, false);   // the err contains JWT error data
    //}

  //  var accessToken = new Access({
    //  accessToken: token,
     // accessTokenExpiresOn: expires,
     // clientId: clientId,
     // userId: userId
      
  //});

  //accessToken.save(callback);
  return callback(false);
};


// The bearer token is a JWT, so we decrypt and verify it. We get a reference to the
// user in this function which oauth2-server puts into the req object
model.getRefreshToken = function (bearerToken, callback) {
  return JWT.verify(bearerToken, JWT_SECRET_FOR_REFRESH_TOKEN, function(err, decoded) {

    if (err) {
      return callback(err, false);
    }

    // other verifications could be performed here
    // eg. that the jti is valid

    // instead of passing the payload straight out we use an object with the
    // mandatory keys expected by oauth2-server plus any other private
    // claims that are useful
    return callback(false, {
      expires: new Date(decoded.exp),
      user: getUserById(decoded.userId)
    });
  });
};



// required for grant_type=refresh_token
// As we're using JWT there's no need to store the token after it's generated
model.saveRefreshToken = function (refreshToken, clientId, expires, userId, callback) {
  return callback(false);
};

// authenticate the client specified by id and secret
model.getClient = function (clientId, clientSecret, callback) {
  if (clientSecret === null) {
    return Client.findOne({ clientId: clientId }, callback);
  }
  Client.findOne({ 
      clientId: clientId, 
      clientSecret: clientSecret
      }, callback);
};

// determine whether the client is allowed the requested grant type
model.grantTypeAllowed = function (clientId, grantType, callback) {
  callback(false, authorizedClientIds[grantType] &&
    authorizedClientIds[grantType].indexOf(clientId.toLowerCase()) >= 0);
};

// authenticate a user
// for grant_type password
model.getUser = function (username, password, callback) {
  User.findOne({ username: username }, function(err, user) {
		if(err) return callback(err);		
		
		if(!user) {
			return callback(null, false, { message: 'Incorrect username.' });
		}
	//	user.validPassword(password, function(err, isMatch) {			
	//		if(err) return callback(err);			
//			if(!isMatch) return callback(null, false, { message: 'Incorrect password.' });
			
	//	});
  return callback(null, user);
		
	});

};

var getUserById = function(userId, callback) {
  return User.findById(userId, callback);
};