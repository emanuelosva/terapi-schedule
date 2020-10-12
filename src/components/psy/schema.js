/**
 * *****************************************
 * @fileoverview Psy schema and JS Docs.
 * @description The js docs create a swagger
 * schemas to document the API.
 * *****************************************
 */

const joi = require('joi')

/**
 * @typedef Psy
 * @property {string} _id.required - The psy id - eg: GNK4ayGUc3vmoOQW3U1bv
 * @property {string} email.required - The psy email - eg: dr.strange@marvel.com
 * @property {string} password.required - The psy password - eg: Psy123
 * @property {string} firstName.required - psy first name - eg: Steven
 * @property {string} lastName.required - psy last name - eg: Strange
 * @property {string} cedula.required - psy profesional cedula - eg: 15976354
 * @property {string} description.required - psy description - eg: I'm ...
 */

/**
 * @typedef PsyIn
 * @property {string} email.required - The psy email - eg: dr.strange@marvel.com
 * @property {string} password.required - The psy password - eg: Psy123
 * @property {string} firstName.required - psy first name - eg: Steven
 * @property {string} lastName.required - psy last name - eg: Strange
 * @property {string} cedula.required - psy profesional cedula - eg: 15976354
 * @property {string} description.required - psy description - eg: I'm ...
 */

const psyInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi
    .string()
    .min(6)
    .max(84)
    .regex(/^[a-zA-Z0-9]/)
    .required(),
  firstName: joi.string().min(2).max(84).required(),
  lastName: joi.string().min(2).max(84).required(),
  cedula: joi.string().min(7).max(8).required(),
  description: joi.string().min(20).max(1000).required(),
})

/**
 * @typedef PsyLogin
 * @property {string} email.required - The psy email - eg: dr.strange@marvel.com
 * @property {string} password.required - The psy password - eg: Psy123
 */

const psyLoginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi
    .string()
    .min(6)
    .max(84)
    .regex(/^[a-zA-Z0-9]/)
    .required(),
})

module.exports = {
  psyInSchema,
  psyLoginSchema,
}
