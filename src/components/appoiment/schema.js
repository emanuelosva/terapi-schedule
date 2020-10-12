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
 * @typedef Appoiment
 * @property {string} _id.required - The appoiment id - eg: RZa8hxHU-cVnm8Qj3U4iu
 * @property {string} psy.required - The psy id - eg: 3aCcGQSb5WTDmkofmd-UG
 * @property {string} patient.required - The patient id - eg: XSN4URo3J3wZvojWVdrkQ
 * @property {string} date.required - The appoimnet date - eg: 2020/12/20
 * @property {string} startTime.required - Initial hour - eg: 2020-12-10T13:00:03-05:00
 * @property {string} endTime.required - End hour - eg: 2020-12-10T13:50:03-05:00
 * @property {number} duration.required - Duration in minutes - eg: 50
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

const idSchema = joi.string().regex(/^(?=.*[a-z]).{21,21}$/)

const agendaInSchema = joi.object({
  days: joi.array().items(dayInSchema).required(),
})

/**
 * @typedef AppoimentConsult
 * @property {string} selectedDay.required - The date desired - eg: 2020/12/20
 * @property {string} psy.required - The psy id - eg: 3aCcGQSb5WTDmkofmd-UG
 * @property {number} duration.required - Duration in minutes - eg: 50
 */

const appoimentConsultSchema = joi.object({
  selectedDay: joi.date().required(),
  psy: idSchema.required(),
  duration: joi.number().required().min(30).max(120),
})

/**
 * @typedef AppoimentIn
 * @property {string} psy.required - The psy id - eg: 3aCcGQSb5WTDmkofmd-UG
 * @property {string} patient.required - The patient id - eg: XSN4URo3J3wZvojWVdrkQ
 * @property {string} startTime.required - Initial hour - eg: 2020-12-10T13:00:03-05:00
 * @property {string} endTime.required - End hour - eg: 2020-12-10T13:50:03-05:00
 * @property {number} duration.required - Duration in minutes - eg: 50
 */

const appoimentInSchema = joi.object({
  psy: idSchema.required(),
  patient: idSchema.required(),
  startTime: joi.date().required(),
  endTime: joi.date().required(),
  duration: joi.number().required().min(30).max(120),
})

/**
 * @typedef AppoimentNewPatinetIn
 * @property {string} psy.required - The psy id - eg: 3aCcGQSb5WTDmkofmd-UG
 * @property {string} startTime.required - Initial hour - eg: 2020-12-10T13:00:03-05:00
 * @property {string} endTime.required - End hour - eg: 2020-12-10T13:50:03-05:00
 * @property {number} duration.required - Duration in minutes - eg: 50
 * @property {PatientIn.model} patient.required - The new patient info
 */

const appoimentNewPatientInSchema = joi.object({
  psy: idSchema.required(),
  startTime: joi.date().required(),
  startTime: joi.date().required(),
  duration: joi.number().required().min(30).max(120),
  patient: joi.object().required(),
})

module.exports = {
  dayOfWeekSchema,
  dayInSchema,
  agendaInSchema,
  appoimentConsultSchema,
  appoimentInSchema,
  appoimentNewPatientInSchema,
}
