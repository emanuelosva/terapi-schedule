/**
 * *********************************
 * @fileoverview General API Router.
 * *********************************
 */

const { Router } = require('express')
const { patientRouter } = require('./patient/router')
const { psyRouter } = require('./psy/router')
const { agendaRouter } = require('./agenda/router')

/**
 * API Router to merge all routers.
 */
const apiRouter = Router()

apiRouter.use('/patients', patientRouter)
apiRouter.use('/psys', psyRouter)
apiRouter.use('/agenda', agendaRouter)

module.exports = {
  apiRouter,
}
