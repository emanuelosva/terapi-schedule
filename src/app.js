/**
 * ****************************************
 * @fileoverview Express APP configuration.
 * ****************************************
 */

const express = require('express')
const { expressLogger } = require('./lib/logger')
const { swaggerServer } = require('./lib/swagger')

/**
 * APP definition
 */
const app = express()

/**
 * Logger middleware
 */
expressLogger(app)

/**
 * Parsers
 */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * Swagger documentation
 */
swaggerServer(app)

/**
 * App server as module
 */
module.exports = { app }
