/**
 * *********************************************
 * @fileoverview Appoiments schemas and JS Docs.
 * @description The js docs create a swagger
 * schemas to document the API.
 * *********************************************
 */

const joi = require('joi')

/**
 * @typedef Appoiment
 * @property {string} _id.required - The appoiment id - eg: RZa8hxHU-cVnm8Qj3U4iu
 * @property {string} psy.required - The psy id - eg: jzzdO3o56N-aU3s1bQUfd
 * @property {string} patient.required - The patient id - eg: jzzdO3o56N-aU3s1bQUfd
 * @property {string} date.required - The appoimnet date - eg: 2020/12/20
 * @property {string} startTime.required - Initial hour - eg: 2020-10-19T10:00:00-05:00
 * @property {string} endTime.required - End hour - eg: 2020-10-19T10:50:00-05:00
 * @property {number} duration.required - Duration in minutes - eg: 50
 */

/**
 * @typedef Hours
 * @property {Array<string>} hours.required - The available hours
 */
/**
 * @typedef AppoimentConsult
 * @property {string} selectedDay.required - The date desired - eg: 2020/12/20
 * @property {number} duration.required - Duration in minutes - eg: 50
 * @property {string} psy.required - The psy id - eg: jzzdO3o56N-aU3s1bQUfd
 */

const idType = joi.string().regex(/^(?=.*[a-zA-Z]).{21,21}$/)

const idSchema = joi.object({
  id: idType.required(),
})

const appoimentConsultSchema = joi.object({
  selectedDay: joi.date().required(),
  duration: joi.number().required().min(30).max(120),
  psy: idType.required(),
})

/**
 * @typedef AppoimentIn
 * @property {string} psy.required - The psy id - eg: jzzdO3o56N-aU3s1bQUfd
 * @property {string} patient.required - The patient id - eg: jzzdO3o56N-aU3s1bQUfd
 * @property {string} startTime.required - Initial hour - eg: 2020-10-19T10:00:00-05:00
 * @property {string} endTime.required - End hour - eg: 2020-10-19T10:50:00-05:00
 * @property {number} duration.required - Duration in minutes - eg: 50
 */

const appoimentInSchema = joi.object({
  psy: idType.required(),
  patient: idType.required(),
  startTime: joi.date().required(),
  endTime: joi.date().required(),
  duration: joi.number().required().min(30).max(120),
})

/**
 * @typedef AppoimentUpdate
 * @property {string} psy.required - The psy id - eg: jzzdO3o56N-aU3s1bQUfd
 * @property {string} startTime.required - Initial hour - eg: 2020-10-19T10:00:00-05:00
 * @property {string} endTime.required - End hour - eg: 2020-10-19T10:50:00-05:00
 * @property {number} duration.required - Duration in minutes - eg: 50
 */

const appoimentUpdateSchema = joi.object({
  psy: idType.required(),
  startTime: joi.date().required(),
  endTime: joi.date().required(),
  duration: joi.number().required().min(30).max(120),
})

/**
 * @typedef AppoimentNewPatinetIn
 * @property {string} psy.required - The psy id - eg: jzzdO3o56N-aU3s1bQUfd
 * @property {string} startTime.required - Initial hour - eg: 2020-10-19T10:00:00-05:00
 * @property {string} endTime.required - End hour - eg: 2020-10-19T10:50:00-05:00
 * @property {number} duration.required - Duration in minutes - eg: 50
 * @property {PatientIn.model} patient.required - The new patient info
 */

const appoimentNewPatientInSchema = joi.object({
  psy: idType.required(),
  startTime: joi.date().required(),
  endTime: joi.date().required(),
  duration: joi.number().required().min(30).max(120),
  patient: joi.object().required(),
})

module.exports = {
  appoimentConsultSchema,
  appoimentInSchema,
  appoimentUpdateSchema,
  appoimentNewPatientInSchema,
  idSchema,
}
