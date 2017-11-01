
'use strict';

var express = require('express');
// var passport = require('passport');
var controller = require('../task/task.controller');
var router = express.Router();

//Get a list of all tasks
router.get('/', controller.getAllTasks);
//Create new task
router.post('/',controller.createTask);

//Get a single task
router.get('/:id', controller.getTask);


module.exports = router;