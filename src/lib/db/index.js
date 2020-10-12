/**
 * ************************
 * @fileoverview DB Access.
 * ************************
 */

const db = require('mongoose')
const { ApiError, httpErrors } = require('../errorManager')
const { logger } = require('../logger')
const { config } = require('../../config')
const { CRUD } = require('./crud')

// Change cb to Primise
db.Promise = global.Promise

/**
 * Create a pool connection to the DB
 */
const connectDb = () => {
  try {
    db.connect(config.db.uri, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }).then(() => {
      logger.info('DB connected')
    }).catch((error) => {
      throw new ApiError(error.message, httpErrors.serverError)
    })
  } catch (error) {
    throw new ApiError(error.message, httpErrors.serverError)
  }
}

module.exports = {
  connectDb,
  CRUD,
}
