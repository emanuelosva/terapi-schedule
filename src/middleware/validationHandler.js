/**
 * ********************************************
 * @fileoverview Request validation middleware.
 * ********************************************
 */

const Joi = require('joi')
const { ApiError, httpErrors } = require('../lib/errorManager')

/**
 * Validate if the passed request data complies with the schema.
 * If the data is invalid the joi validation error is returned.
 * @param {joi.object} joiObjectSchema - The schema that validate data
 * @param {any} data - Data to validate
 */
const validateSchema = async (joiObjectSchema, data) => {
  try {
    await joiObjectSchema.validateAsync(data)
  } catch (error) {
    return error
  }
}

/**
 * Validation Handler middleware. Checks if the request cumplies with
 * the expected schema.
 * @param {joi.object} joiObjectSchema - The expected schema
 * @param {string} checkLocation - The request location for validate
 */
const validationHandler = (joiObjectSchema, checkLocation = 'body') => {
  return async (req, res, next) => {
    const data = req[checkLocation]
    const error = await validateSchema(joiObjectSchema, data)
    error ? next(new ApiError(error.message, httpErrors.badRequest)) : next()
  }
}

module.exports = {
  validationHandler,
}
