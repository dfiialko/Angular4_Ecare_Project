'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PhoneSchema = new mongoose.Schema({
	phoneNumber: { type: String, required: true, unique: true },
	phoneType: { type: String, required: true, default: 'Mobile', enum: ['Home', 'Mobile', 'Work', 'Other'] },
	isPrimary: { type: Boolean, required: true }
});


module.exports = mongoose.model('Phone', PhoneSchema);