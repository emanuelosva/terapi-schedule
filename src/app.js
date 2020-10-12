/**
 * ****************************************
 * @fileoverview Express APP configuration.
 * ****************************************
 */

const express = require('express')
const cookieParser = require('cookie-parser')
const { apiRouter } = require('./components')
const { connectDb } = require('./lib/db')
const { expressLogger } = require('./lib/logger')
const { swaggerServer } = require('./lib/swagger')
const { logger } = require('./lib/logger')
const { notFoundHandler, errorHandler } = require('./middleware')

/**
 * APP definition
 */
const app = express()

/**
 * Lauch DB on app initialization
 */
connectDb()

/**
 * Swagger documentation
 */
swaggerServer(app)

/**
 * Middlewares
 */

// Logs the request/response info
expressLogger(app)

// Requests Pasrsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

/**
 * Router
 */
app.use('/api', apiRouter)

/**
 * Error middlewares
 */
app.use(notFoundHandler)
app.use(errorHandler)

process.on('unhandledRejection', (error) => {
  logger.info(error)
  process.exit(1)
})

process.on('uncaughtException', (error) => {
  logger.info(error)
  process.exit(1)
})

/**
 * App server as module
 */
module.exports = { app }
