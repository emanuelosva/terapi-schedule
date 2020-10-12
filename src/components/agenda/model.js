/**
 * *******************************
 * @fileoverview Agenda DB models.
 * *******************************
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
 * Day DB model
 */
const DaySchema = mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  psy: { ...stringRequired, ref: 'Psy' },
  dayOfWeek: stringRequired,
  workingPlan: {
    start: stringRequired,
    end: stringRequired,
  },
  breaks: [
    {
      start: String,
      end: String,
    },
  ],
})

const DayModel = mongoose.model('Day', DaySchema, 'days')

module.exports = {
  DayModel,
}
