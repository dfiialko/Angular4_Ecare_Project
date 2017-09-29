/**
 * Main application file
 */

'use strict';

//Use by Swagger. Move this to dev or test env
var SwaggerExpress = require('swagger-express-mw');
var debug = require('debug')('ecaresmart-api')
var cors = require('cors');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var path = require('path');

var config = require('./config/config');
var log = require('./log')(module);
//var oauth2 = require('./api/auth/oauth2');

module.exports = app; 
var app = express();

//Move this to config file
var config = {
  appRoot: __dirname // required config
};

//connect to dev database
mongoose.Promise = global.Promise;
var mongoUri = 'mongodb://localhost/ecaresmart-api-dev';
mongoose.connect(mongoUri, { useMongoClient: true});
var conn = mongoose.connection;
conn.on('error', function (err) {
	log.error('Connection error:', err.message);
});
conn.once('open', function callback () {
    log.info("Connected to DB!");
    //global.gfs = Grid(conn.db);
});

//Enable cors
  app.use(cors());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(methodOverride());
app.use(passport.initialize());

app.use('/images', express.static(__dirname + '/api/views/images/'));

//set view engine
app.set('views', path.join(__dirname, 'api/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

 require('./api/routes/routes')(app);

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

   app.get('/api/swagger.yaml', function(req, res){
   res.setHeader('Content-Type', 'application/json');
   res.sendFile(config.appRoot + '/api/swagger/swagger.yaml');
  });

  app.set('port', process.env.PORT || 10020);

  app.listen( app.get('port'), function() {
  debug('Express server listening on port ' + app.get('port'));
  log.info('Express server listening on port ' + app.get('port'));
});

  // catch 404 and forward to error handler
app.use(function(req, res, next){
    res.status(404);
    log.debug('%s %d %s', req.method, res.statusCode, req.url);
    res.json({ 
    	error: 'Not found' 
    });
    return;
});

// error handlers
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('%s %d %s', req.method, res.statusCode, err.message);
    res.json({ 
    	error: err.message 
    });
    return;
});


});