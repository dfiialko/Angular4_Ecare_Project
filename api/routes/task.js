
'use strict';

var express = require('express');
// var passport = require('passport');
var controller = require('../task/task.controller');
var router = express.Router();

// router.get('/info', 
//     function(req, res) {
//         // req.authInfo is set using the `info` argument supplied by
//         // `BearerStrategy`.  It is typically used to indicate scope of the token,
//         // and used in access control checks.  For illustrative purposes, this
//         // example simply returns the scope in the response.
//         res.json({ 
//         	user_id: req.user.userId, 
//         	name: req.user.username, 
//         	scope: req.authInfo.scope 
//         });
//     }
// );

//Get a list of all tasks
router.get('/', controller.getAllTasks);
//Create new task
router.post('/',controller.createTask);

//Get a single task
router.get('/:id', controller.getTask);


module.exports = router;