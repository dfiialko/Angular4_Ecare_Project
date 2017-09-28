
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RefreshTokenSchema = new mongoose.Schema({
	refreshToken: { type: String, unique: true, required: true },
    refreshTokenCreatedOn: { type: Date, default: Date.now },
    refreshTokenExpiresOn: { type: Date },
    //client : { type: Object },  // `client` and `user` are required in multiple places, for example `getAccessToken()`
	clientId: { type: String, required: true },
    //user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userId: { type: String, required: true }
});


module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);