'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');



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

UserSchema.virtual('userId')
.get(function () {
	return this.id;
});

/**
 * Methods
 */
UserSchema.methods = {
	//check password validity
	validPassword: function(password, callback) {
		bcrypt.compare(password, this.password, function(e, isMatch) {
			if(e) return callback(e, null);

			return callback(null, isMatch);
		});
	
		return false;
	
	}

};
module.exports = mongoose.model('User', UserSchema);
