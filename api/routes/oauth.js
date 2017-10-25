
'use strict';

var express = require('express');
var passport = require('passport');
require('../auth/auth');
var oauth2 = require('../auth/oauth2');
var router = express.Router();

/* Authenticate user */
router.post('/token', oauth2.token);


module.exports = router;