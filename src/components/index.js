/**
 * *********************************
 * @fileoverview General API Router.
 * *********************************
 */

const { Router } = require('express')
const { patientRouter } = require('./patient/router')
const { psyRouter } = require('./psy/router')
const { agendaRouter } = require('./agenda/router')
const { appoimenRouter } = require('./appoiment/router')

/**
 * API Router to merge all routers.
 */
const apiRouter = Router()

apiRouter.use('/patients', patientRouter)
apiRouter.use('/psys', psyRouter)
apiRouter.use('/agenda', agendaRouter)
apiRouter.use('/appoiments', appoimenRouter)

module.exports = {
  apiRouter,
}
