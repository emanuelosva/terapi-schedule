/**
 * *****************************************
 * @fileoverview Agenda schemas and JS Docs.
 * @description The js docs create a swagger
 * schemas to document the API.
 * *****************************************
 */

const joi = require('joi')

/**
 * @typedef Agenda
 * @property {Array<Day>} daysInServices.required - Days defined
 */

/**
 * @typedef Day
 * @property {string} _id.required - The day id - eg: TZF8rxHU-cVnO8QW3U4ia
 * @property {string} psy.required - The psy id - eg: 3aCcGQSb5WTDmkofmd-UG
 * @property {string} dayOfWeek.required - The day selected - eg: Monday
 * @property {WorkingPlan.model} workingPlan.required - The day init/end hours
 * @property {Array<Break>} breaks - Hours without service
 */

/**
 * @typedef Break
 * @property {string} start.required - Initial hour - eg: 15:00
 * @property {string} end.required - Last hour - eg: 15:30
 */

/**
 * @typedef WorkingPlan
 * @property {string} start.required - Initial hour - eg: 10:00
 * @property {string} end.required - Last hour - eg: 18:00
 */

/**
 * @typedef DayIn
 * @property {string} dayOfWeek.required - The day of week - eg: Monday
 * @property {WorkingPlan.model} workingPlan.required - The day init/end hours
 * @property {Array<Break>} breaks - Hours without service
 */

const dayOfWeek = joi
  .string()
  .valid(
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  )

const dayOfWeekSchema = joi.object({
  dayOfWeek: dayOfWeek,
})

const hourSchema = joi.string().regex(/^([0-9]{2})\:([0-9]){2}/)

const hourRangeSchema = joi.object({
  start: hourSchema.required(),
  end: hourSchema.required(),
})

const dayInSchema = joi.object({
  dayOfWeek: dayOfWeek.required(),
  workingPlan: hourRangeSchema.required(),
  breaks: joi.array().items(hourRangeSchema).required(),
})

/**
 * @typedef AgendaIn
 * @property {Array<DayIn>} days.required - The workin plans for days of week
 */

const agendaInSchema = joi.object({
  days: joi.array().items(dayInSchema).required(),
})

module.exports = {
  dayOfWeekSchema,
  dayInSchema,
  agendaInSchema,
}
