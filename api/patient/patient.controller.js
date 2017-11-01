'use strict';

var _ = require('lodash');
var Patient = require('./patient.model');
var async = require('async');
var moment = require('moment'); 

var default_size = 100; 


// Get list of patients

