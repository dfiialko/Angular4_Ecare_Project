var faker = require('faker');

var log = require('./log')(module);
var config = require('./config/config');
var mongoose = require('mongoose');
var User = require('./api/models/user.model');
var Client = require('./api/models/client.model');
var AccessToken = require('./api/models/accessToken.model');
var RefreshToken = require('./api/models/refreshToken.model');


mongoose.connect(config.get('mongoose:uri'), { useMongoClient: true});

var db = mongoose.connection;

db.on('error', function (err) {
	log.error('Connection error:', err.message);
});

db.once('open', function callback () {
	log.info("Connected to DB!");
});


User.remove({}, function(err) {
    var user = new User({ 
        username: config.get("default:user:username"), 
        password: config.get("default:user:password"),
        email: config.get("default:user:email")  
    });
    
    user.save(function(err, user) {
        if(!err) {
            log.info("New user - %s:%s", user.username, user.password);
        }else {
            return log.error(err);
        }
    });
});

Client.remove({}, function(err) {
    var client = new Client({ 
        name: config.get("default:client:name"), 
        clientId: config.get("default:client:clientId"), 
        clientSecret: config.get("default:client:clientSecret"),
        isTrusted: config.get("default:client:isTrusted")  
    });
    
    client.save(function(err, client) {

        if(!err) {
            log.info("New client - %s:%s", client.clientId, client.clientSecret);
        } else {
            return log.error(err);
        }

    });
});

AccessToken.remove({}, function (err) {
    if (err) {
        return log.error(err);
    }
});

RefreshToken.remove({}, function (err) {
    if (err) {
        return log.error(err);
    }
});

setTimeout(function() {
    db.close();
}, 3000);