/**
 * ****************************
 * @fileoverview Agenda Router.
 * ****************************
 */

const { Router } = require('express')
const { validationHandler } = require('../../middleware')
const { scopes, cookieAuthenticate } = require('../../lib/auth')
const { agendaController } = require('./controller')
const { dayInSchema, agendaInSchema, dayOfWeekSchema } = require('./schema')

/**
 * Router instance
 */
const router = Router()
router.use(cookieAuthenticate({ scopes: [scopes.PSY] }))

/**
 * Create psy agenda
 * @route POST /agenda
 * @group Agenda - Operations about agenda
 * @param {AgendaIn.model} agenda.body.required - The weekly agenda
 * @returns {Success.model} 201 - Operation successful.
 * @returns {BadRequest.model} 400 - Invalid request data.
 * @returns {Unauthorized.model} 401 - Invalid credentials.
 * @returns {Forbidden.model} 403 - Forbidden.
 * @security COOKIE
 */
router.post(
  '/',
  validationHandler(agendaInSchema, 'body'),
  async (req, res, next) => {
    try {
      const psy = req.user
      const { days } = req.body
      const result = await agendaController.create({ psy, days })
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }
)

/**
 * Get psy agenda
 * @route GET /agenda
 * @group Agenda - Operations about agenda
 * @param {string} dayOfWeek.query - The specific day to retrieve
 * @returns {Agenda.model} 200 - Weekly working plan
 * @returns {BadRequest.model} 400 - Invalid request query
 * @returns {Unauthorized.model} 401 - Invalid credentials
 * @returns {Forbidden.model} 403 - Forbidden.
 * @security COOKIE
 */
router.get(
  '/',
  validationHandler(dayOfWeekSchema, 'query'),
  async (req, res, next) => {
    try {
      const psy = req.user
      const { dayOfWeek } = req.query
      const agenda = await agendaController.read({ psy, dayOfWeek })
      res.status(200).json({ agenda })
    } catch (error) {
      next(error)
    }
  }
)

/**
 * Upsert psy agenda
 * @route PUT /agenda
 * @group Agenda - Operations about agenda
 * @param {DayIn.model} day.body.required - The day working plan
 * @returns {Success.model} 200 - Day updated.
 * @returns {BadRequest.model} 400 - Invalid request data.
 * @returns {Unauthorized.model} 401 - Invalid credentials.
 * @returns {Forbidden.model} 403 - Forbidden.
 * @security COOKIE
 */
router.put(
  '/',
  validationHandler(dayInSchema, 'body'),
  async (req, res, next) => {
    try {
      const psy = req.user
      const dayData = req.body
      const result = await agendaController.update({ psy, dayData })
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
)

/**
 * Upsert psy agenda
 * @route DELETE /agenda/{dayOfWeek}
 * @group Agenda - Operations about agenda
 * @param {string} dayOfWeek.path - The day to delete
 * @returns {Success.model} 200 - Day reseted.
 * @returns {BadRequest.model} 400 - Invalid request data.
 * @returns {Unauthorized.model} 401 - Invalid credentials.
 * @returns {Forbidden.model} 403 - Forbidden.
 * @security COOKIE
 */
router.delete(
  '/:dayOfWeek',
  validationHandler(dayOfWeekSchema, 'params'),
  async (req, res, next) => {
    try {
      const psy = req.user
      const { dayOfWeek } = req.params
      const result = await agendaController.delete({ psy, dayOfWeek })
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = {
  agendaRouter: router,
}
