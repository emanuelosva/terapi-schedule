/**
 * *****************************************
 * @fileoverview Patient schema and JS Docs.
 * @description The js docs create a swagger
 * schemas to document the API.
 * *****************************************
 */

const joi = require('joi')

/**
 * @typedef Patient
 * @property {string} _id.required - The patient id - eg: GNK4ayGUc3vmoOQW3U1bv
 * @property {string} email.required - The patient email - eg: stan@marvel.com
 * @property {string} firstName.required - Patient first name - eg: Stan
 * @property {string} lastName.required - Patient last name - eg: Lee
 * @property {string} cel.required - Patient cel phone number - eg: +5254298632
 * @property {string} zoomId - Patient Zoom ID - eg: 910 8957 2648
 * @property {Array<Appoiment>} appoiments - Patient appoiments
 */

/**
 * @typedef PatientIn
 * @property {string} email.required - The patient email - eg: stan@marvel.com
 * @property {string} name.required - Patient name - eg: Stan Lee
 * @property {string} cel.required - Patient cel phone number - eg: +5254298632
 * @property {string} zoomId - Patient Zoom ID - eg: 910 8957 2648
 */

const patientInSchema = joi.object({
  email: joi.string().email().required(),
  name: joi.string().min(2).max(84).required(),
  cel: joi.string().required(),
  zoomId: joi.string(),
})

/**
 * @typedef PatientLogin
 * @property {string} email.required - The patient email - eg: stan@marvel.com
 */

const patientLoginSchema = joi.object({
  email: joi.string().email().required(),
})

module.exports = {
  patientInSchema,
  patientLoginSchema,
}
