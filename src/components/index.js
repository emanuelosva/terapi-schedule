/**
 * *********************************
 * @fileoverview General API Router.
 * *********************************
 */

const { Router } = require('express')
const { patientRouter } = require('./patient/router')

/**
 * API Router to merge all routers.
 */
const apiRouter = Router()

apiRouter.use('/patients', patientRouter)

module.exports = {
  apiRouter,
}
