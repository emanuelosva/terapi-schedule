/**
 * *****************************
 * @fileoverview Logger service.
 * *****************************
 */

const pino = require('pino')
const morgan = require('morgan')

/**
 * App Logger - Defaul log level: `ìnfo`
 */
const logger = pino({ level: process.env.LOG_LEVEL || 'info' })

/**
 * Add a logger middleware to log info about request/response
 * @param {express.Application} app
 */
const expressLogger = (app) => {
  app.use(morgan('dev'))
}

module.exports = {
  logger,
  expressLogger,
}
