
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true  },
	clientId: { type: String, unique: true, required: true  },
	clientSecret: { type: String, required: true },
    isTrusted: {type: Boolean, required: true } 
});


module.exports = mongoose.model('Client', ClientSchema);