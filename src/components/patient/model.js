/**
 * *******************************
 * @fileoverview Patient DB model.
 * *******************************
 */

const mongoose = require('mongoose')
const { nanoid } = require('nanoid')
const { ApiError, httpErrors } = require('../../lib/errorManager')

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
  email: { ...stringRequired, required: true },
  firstName: stringRequired,
  lastName: String,
  cel: stringRequired,
  zoomId: String,
})

/**
 * Validate email is unique
 */
PatientSchema.pre('save', async function (next) {
  try {
    const db = mongoose.connection.db
    const existingEmail = await db
      .collection('patients')
      .findOne({ email: this.email })

    if (!existingEmail) return next()

    return Promise.reject(
      new ApiError('Email already exists', httpErrors.conflict)
    )
  } catch (error) {
    next(error)
  }
})

const PatientModel = mongoose.model('Patient', PatientSchema, 'patients')

module.exports = {
  PatientModel,
}
