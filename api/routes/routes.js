'use strict';

var api = require('./api');
var user = require('./user');
var oauth = require('./oauth');
//var patient = require('./patients');
module.exports = function(app) {
    app.use('/',api);
    app.use('/api', api);
    app.use('/api/user', user);
    app.use('/api/oauth', oauth);
    //app.use('/api/patients',patient);
}