/**
 * **********************************
 * @fileoverview Appoiment DB models.
 * **********************************
 */

const mongoose = require('mongoose')
const { nanoid } = require('nanoid')

/**
 * Required Types (DRY)
 */
const stringRequired = {
  type: String,
  required: true,
}

/**
 * Appoiment DB model
 */
const AppoimentSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  psy: { ...stringRequired, ref: 'Psy' },
  patient: { ...stringRequired, ref: 'Patient' },
  date: { type: Date, required: true },
  startTime: stringRequired,
  endTime: stringRequired,
  duration: { type: Number, required: true },
})

/**
 * Populate the patient and psy info.
 */
function autoPopulate(next) {
  this.populate({ path: 'psy', select: 'firstName lastName' })
  this.populate({ path: 'patient', select: 'firstName lastName -_id' })
  next()
}
AppoimentSchema.pre('find', autoPopulate)
AppoimentSchema.pre('findOne', autoPopulate)

const AppoimentModel = mongoose.model(
  'Appoiment',
  AppoimentSchema,
  'appoiments'
)

module.exports = {
  AppoimentModel,
}
