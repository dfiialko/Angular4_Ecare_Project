'use strict';

var _ = require('lodash');
var User = require('./user.model');
var default_size = 100;


var validationError = function(res, err) {
  return res.json(422, err);
};


/**
 * Get a list of users
 */
exports.getAllUsers = function (req, res, next) {
    User.find({}, '-__v -password -tokens  -loginAttempts',  function (err, users) {
    if (err) return res.send(500, err);
    res.json(users)
  });
};


/**
 * Creates a new user
 */
exports.createUser = function (req, res, next) {
  var newUser = new User(req.body);

  newUser.save(function(err) {
    if (err) return validationError(res, err);
    //res.json(newUser);
    res.json(_.omit(newUser.toObject(), ['__v', 'password', 'tokens', 'loginAttempts']));
  });
};


/**
 * Get a single user
 */
exports.getUser = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(_.omit(user.toObject(), ['__v', 'password', 'tokens', 'loginAttempts']));
  });
};