'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var async = require("async");
var uniqueValidator = require("mongoose-unique-validator");
var bcrypt = require('bcrypt');
var randomstring = require("randomstring");

var config = require('../../config/config');

// Represents use of the e-CareSmart Platform
var UserSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
    lastName: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, index: {unique: true} },
	password: { type: String, required: true },
	isPatient: {type:Boolean, default:true}, //false = clinician, true = patient
	loginAttempts: { type: Number, required: true, default: 0 },
    lockUntil: { type: Number }, // unix time, set to 1 when not locked
	tokens: [String], // access tokens for this user - should we track tokens here or in its own model?
	updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now }
    //role: { type: Schema.Types.ObjectId, ref: 'Role', required: true }
});

// Give nice errors when email is not unique
UserSchema.plugin(uniqueValidator, {
    message: "USER_ALREADY_EXISTS"
}); 

// Index user tokens for fast authentication
UserSchema.index({
	"tokens": 1
});

// When creating a new user, send them an email as well
UserSchema.pre("save", function (next) {
	if (this.isNew) {
//		this.notify({
//			template: "registration"
//        });
    }

    // Notify is asynchronous but don't care about waiting for the result
    next();
});

//protect the password
UserSchema.pre('save', function(next) {
	var user = this;

	if(!user.isModified('password')) return next();

	bcrypt.genSalt(10, function(e, salt) {
		if(e) return next(e);

		bcrypt.hash(user.password, salt, function(e, hash) {
			if(e) return next(e);
			user.password = hash;
			next();
		});
	});
});

// if account is currently locked, check for a future lockUntil timestamp
UserSchema.virtual("isLocked").get(function () {
	return (typeof this.lockUntil !== "undefined" && this.lockUntil > Date.now());
});

// if account has an old, expired lock on it
UserSchema.virtual("hasOldLock").get(function () {
	return (typeof this.lockUntil !== "undefined" && this.lockUntil <= Date.now());
});

UserSchema.virtual('userId')
.get(function () {
	return this.id;
});

/**
 * Methods
 */
UserSchema.methods = {

	// remove any (expired or current) lock
	removeLock: function (callback) {
		this.loginAttempts = 0;
        this.lockUntil = undefined;
        this.save(callback);
	},

	// increment # failed login attempts
	incrementLoginAttempts: function (callback) {
		// if we have a previous lock that has expired, remove it and then increment
        if (this.hasOldLock) {
            return this.removeLock(function (err) {
                if (err) return callback(err);
                // this.hasOldLock is false now
                this.incrementLoginAttempts(callback);
            }.bind(this));
        }

        // otherwise increment the lock
        this.loginAttempts++;
        // and lock the account if we've reached max attempts and it's not locked already
        if (this.loginAttempts >= config.get('MAX_LOGIN_ATTEMPTS && !this.isLocked')) {
            this.lockUntil = Date.now() + config.get('LOCK_TIME');
        }
        this.save(callback);
    },

	//check password validity
	validPassword: function(loginPassword, callback) {
		// don't authenticate if account is locked!
        // instead increment login attempts
        if (this.isLocked) {
			return this.incrementLoginAttempts(function (err) {
                if (err) return callback(err);
                return callback(errors.LOGIN_ATTEMPTS_EXCEEDED);
            });
		}
		bcrypt.compare(loginPassword, this.password, function(e, isMatch) {
			if(e) return callback(e, null);

			return callback(null, isMatch);
		});
	
		return false;
	
	}

//change password

};

module.exports = mongoose.model('User', UserSchema);