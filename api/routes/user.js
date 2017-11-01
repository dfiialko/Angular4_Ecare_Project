
'use strict';

var express = require('express');
var passport = require('passport');
var controller = require('../user/user.controller');
var router = express.Router();

router.get('/info', 
    function(req, res) {
        // req.authInfo is set using the `info` argument supplied by
        // `BearerStrategy`.  It is typically used to indicate scope of the token,
        // and used in access control checks.  For illustrative purposes, this
        // example simply returns the scope in the response.
        res.json({ 
        	user_id: req.user.userId, 
        	name: req.user.username, 
        	scope: req.authInfo.scope 
        });
    }
);

//Get a list of all users
router.get('/', passport.authenticate('accessToken', { session: false }), controller.getAllUsers);
//Create new user
router.post('/', passport.authenticate('accessToken', { session: false }), controller.createUser);

//Get a single user
router.get('/:id', passport.authenticate('accessToken', { session: false }), controller.getUser);


module.exports = router;