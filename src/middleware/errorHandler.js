/**
 * *******************************************
 * @fileoverview API Error handler middleware.
 * *******************************************
 */

const { logger } = require('../lib/logger')
const { config } = require('../config')

/**
 * Return an API error response on some http error
 * @param {ApiError} err - ApiError
 * @param {Express.Request} req - request object
 * @param {Express.Response} res - response object
 * @param {Express.NextFunctions} next - express next function
 */
const errorHandler = (err, req, res, next) => {
  const status = err.status
  const message = err.message

  // Log stack trace on development
  if (config.app.dev) {
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
