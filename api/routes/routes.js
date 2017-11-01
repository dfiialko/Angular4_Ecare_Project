'use strict';

var api = require('./api');
var users = require('./user');
var oauth = require('./oauth');
var tasks = require('./task');
module.exports = function(app) {

    app.use('/',api);
    app.use('/api', api);
     app.use('/api/users', users);
     app.use('/api/oauth', oauth);
     app.use('/api/tasks', tasks);
    
}