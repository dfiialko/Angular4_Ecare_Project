'use strict';

var _ = require('lodash');
var async = require('async');
var moment = require('async');
var Task = require('./treatment-task.model');


/**
 * Get a list of all tratment tasks
 */
exports.getAllTasks = function(req,res,next){
    Task.find({},'-__v -password -tokens -loginAttempts',function(err,users){
        if (err) return res.send(500, err);
        res.json(tasks)
    });
};

/**
 * Creates a new task
 */
exports.createTask = function(req,res,next){
    var newTask = new Task(req.body);

    newTask.save(function(err){
        if(err) return validationError(res,err);
        res.json(_.omit(newTask.toObject(),['__v', 'password', 'tokens', 'loginAttempts']));
    });
};

/**
 * Get a single task
 */
exports.getTask = function (req, res, next) {
    var taskId = req.params.id;
    Task.findById(taskId, function (err, user) {
      if (err) return next(err);
      if (!task) return res.send(401);
      res.json(_.omit(task.toObject(), ['__v', 'password', 'tokens', 'loginAttempts']));
    });
  };