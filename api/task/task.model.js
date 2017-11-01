'use strict'; 

var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 

var medicationSchema = require('../medication/medication.model'); 

var paginate = require('mongoose-paginate'); 

var TaskSchema = new mongoose.Schema({ 
title:{type:String,required:true}, 
instructions:{type:String,required:true}, 
repeatWeekDay:{type:Number,required:false}, 
medication:[medicationSchema], 
reading:[{ 
   readingType:{type:String,required:true}, 
   measureType:{type:String,required:true}, 
   measureValue:{type:String,required:true}, 
   measureUnits:{type:String,required:true}, 
   measureFormat:{type:String,required:true} 
}], 
alerts:[{type:Schema.Types.ObjectId,ref:'Alert'}], 
plans:[{type:Schema.Types.ObjectId,ref:'Plan'}], 
createdAt:{type: Date, default: Date.now }, 
createdBy:{type:Schema.Types.ObjectId,ref:'User'}, 
updatedAt:{type: Date, default: Date.now }, 
updatedBy:{type:Schema.Types.ObjectId,ref:'User'} 
}); 