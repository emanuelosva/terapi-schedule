/**
 * *******************************
 * @fileoverview Agenda DB models.
 * *******************************
 */

const { number } = require('joi')
const mongoose = require('mongoose')
const { nanoid } = require('nanoid')

/**
 * Required Types (DRY)
 */
const stringRequired = {
  type: String,
  required: true,
}

const dateRequired = {
  type: Date,
  required: true,
}

/**
 * Day DB model
 */
const DaySchema = mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  psy: {
    type: String,
    required: true,
    ref: 'Psy'
  },
  dayOfWeek: stringRequired,
  start: stringRequired,
  end: stringRequired,
  breaks: [{
    start: String,
    end: String,
  }],
  hoursOnService: [String]
})

/**
 * Appoiment DB model
 */
const AppoimentSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  psy: {
    type: String,
    required: true,
    ref: 'Psy'
  },
  patient: {
    type: String,
    required: true,
    ref: 'Patient'
  },
  date: dateRequired,
  startTime: dateRequired,
  endTime: dateRequired,
  duration: {
    type: number,
    required: true,
  },
  hoursTaked: [String],
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

const DayModel = mongoose.model('Day', DaySchema, 'days')
const AppoimentModel = mongoose.model('Appoiment', AppoimentSchema, 'appoiments')

module.exports = {
  DayModel,
  AppoimentModel,
}
