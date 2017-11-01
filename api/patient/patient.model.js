'use strict';

var randomstring = require("randomstring");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//nested patient data
var habitSchema = require('habit.model')
var clinicianSchema = require('../clinician/clinician.model')
var PhoneSchema = require('../supplement/phone.model')
var addressSchema = require('../supplement/address.model')
var treatmentPlanSchema = require('../plan/plan.model')
var treatmentTaskSchema = require('../task/task.model')
var medicationSchema = require('../task/medication.model')
var healthSchema = require('../task/health.model')
var sharesSchema = require('../share/share.model')

var paginate = require('mongoose-paginate');

var PatientSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: String, default: null },
    sex: { type: String, default: 'Unspecified', enum: ['Female', 'Male', 'Unspecified'] },
    email: { type: String, required: true },
    generatedPass: { type: String, required: true },
    isActive: {type: Boolean, default: true},
    avatarType: {
        ext: { type: String, default: 'png' }, // file extension
        mime: { type: String, default: 'image/png' } // mime type
    },
    phoneNumbers: [PhoneSchema],
    addresses: [addressSchema],
    patientHabits: [habitSchema],
    patientClinicians: [clinicianSchema],
    patientTreatmentPlans: [treatmentPlanSchema],
    patientTasks: [treatmentTaskSchema],
    patientMedications: [medicationSchema],
    patientHealthData: [healthSchema],
    patientFamilyShares: [sharesSchema],
    userId: {type : Schema.Types.ObjectId, ref: 'User'},
    createdBy: {type : Schema.Types.ObjectId, ref: 'User'},
    updatedBy: {type : Schema.Types.ObjectId, ref: 'User'},
	updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now }
});

//when we remove/deactivate patient from patient documents. then remove/deactivate it from users too. or Mayeb in the future allow patients to self-monitor
PatientSchema.post('remove', function(next) {
    var self = this; 
    this.model('User').remove (
        {_id: self.userId},
        next
    );
});

//When create new patient, make sure patient is new and doesn't exist
PatientSchema.pre('save', function(next) {
    var self= this; 
    if(self.isNew) {
        self.generatedPass = randomstring.generate(8);

        this.model('User').create({
            _id:self._id, 
            firstName:self.firstName,
            lastName:self.lastName,
            email:self.email,
            password:self.generatedPass, 
            isPatient: true}, function(err,user) {
                if(err) {
                    next(err);
                } else if(user) {
                    self.userId = user._id;
                    next()
                }
                else {
                    next(new Error("Error creating new patient"))
                }
            }
        )
    } else {
        next()
    }
});

PatientSchema.plugin(paginate);

module.exports = mongoose.model('Patient', PatientSchema);