
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccessTokenSchema = new mongoose.Schema({
	accessToken: { type: String, unique: true, required: true },
    accessTokenCreatedOn: { type: Date, default: Date.now },
    accessTokenExpiresOn: { type: Date },
    //client : { type: Object },  // `client` and `user` are required in multiple places, for example `getAccessToken()`
	clientId: { type: String, required: true },
    //user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userId: { type: String, required: true }
});


module.exports = mongoose.model('AccessToken', AccessTokenSchema);