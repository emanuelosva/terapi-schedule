/**
 * ****************************************
 * @fileoverview Express APP configuration.
 * ****************************************
 */

const express = require('express')
const { expressLogger } = require('./lib/logger')

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
 * App server as module
 */
module.exports = { app }
