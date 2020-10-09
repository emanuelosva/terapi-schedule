/**
 * *******************************
 * @fileoverview Patient DB model.
 * *******************************
 */

const mongoose = require('mongoose')
const nanoid = require('nanoid')

/**
 * Required String Type (DRY)
 */
const stringRequired = {
  type: String,
  required: true,
}

/**
 * Patient DB model
 */
const PatientSchema = mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  email: stringRequired,
  firstName: stringRequired,
  lastName: stringRequired,
  cel: stringRequired,
  zoomId: {
    type: String,
    required: false,
  }
})

const PatientModel = mongoose.model('Patient', PatientSchema, 'patients')

module.exports = {
  PatientModel,
}
