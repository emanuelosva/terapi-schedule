/**
 * *******************************************
 * @fileoverview API Error handler middleware.
 * *******************************************
 */

const { logger } = require('../lib/logger')
const { config } = require('../config')
const { httpErrors } = require('../lib/errorManager')

/**
 * Return an API error friendly response to client
 * on a client, validatione or constrain error catched
 * by the API.
 * @param {ApiError} err - ApiError
 * @param {Express.Request} req - request object
 * @param {Express.Response} res - response object
 * @param {Express.NextFunctions} next - express next function
 */
const errorHandler = (err, req, res, next) => {
  const status = err.status || httpErrors.serverError
  const message = err.message || 'Server Error'

  // Log stack trace on development
  // or on unexpected error.
  if (config.app.dev || err.isOperational) {
    logger.info(err.message)
    logger.info(err.stack)
  }

  res.status(status).json({
    error: true,
    detail: message,
  })
}

module.exports = {
  errorHandler,
}
