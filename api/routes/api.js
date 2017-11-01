
'use strict';

var express = require('express');
var passport = require('passport');
var router = express.Router();


/* GET API documentation */
//router.get('/', passport.authenticate('accessToken', { session: false }), function (req, res) {
//   res.render('index');
//});

router.get('/', function (req, res) {
    res.render('index');
});

module.exports = router;