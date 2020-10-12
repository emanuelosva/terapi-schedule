/**
 * ****************************
 * @fileoverview Agenda Router.
 * ****************************
 */

const { Router } = require('express')
const { validationHandler } = require('../../middleware')
const { scopes, cookieAuthenticate } = require('../../lib/auth')
const { agendaController } = require('./controller')
const {
  dayInSchema,
  agendaInSchema,
  dayOfWeekSchema,
  appoimentConsultSchema,
  appoimentInSchema,
  appoimentNewPatientInSchema,
} = require('./schema')

/**
 * Router instance
 */
const router = Router()

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
  cookieAuthenticate({ scopes: [scopes.PSY] }),
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
 * @returns {Unauthorized.model} 401 - Invalid credentials
 * @returns {Forbidden.model} 403 - Forbidden.
 * @security COOKIE
 */
router.get(
  '/',
  cookieAuthenticate({ scopes: [scopes.PSY] }),
  validationHandler(dayOfWeekSchema, 'query'),
  async (req, res, next) => {
    try {
      const psy = req.user
      const { dayOfWeek } = req.query
      const agenda = await agendaController.read({ psy, dayOfWeek })
      res.status(200).json(agenda)
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
  cookieAuthenticate({ scopes: [scopes.PSY] }),
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
  cookieAuthenticate({ scopes: [scopes.PSY] }),
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

/**
 * Get available appoiment hours
 * @route GET /agenda/appoiments
 * @group Agenda - Operations about agenda
 * @param {string} psy.query.required - The psy id - eg: 3aCcGQSb5WTDmkofmd-UG
 * @param {string} duration.query.required - Appoiment duration - eg: 50
 * @param {string} selectedDay.query.required - Desired day - eg: 2020/12/20
 * @returns {Array<string>} 200 - Availbale hours - eg: [14:00, 15:00]
 * @returns {BadRequest.model} 400 - Invalid request data.
 */
router.get(
  '/appoiments',
  validationHandler(appoimentConsultSchema, 'query'),
  async (req, res, next) => {
    try {
      const { psy, duration, selectedDay } = req.query
      res.status(200).json({ psy, duration, selectedDay })
    } catch (error) {
      next(error)
    }
  }
)

/**
 * Create new appoiment
 * @route POST /agenda/appoiments
 * @group Agenda - Operations about agenda
 * @param {AppoimentIn.model} appoiment.body.required - The appoiment data
 * @returns {Appoiment.model} 201 - Appoiment info.
 * @returns {BadRequest.model} 400 - Invalid request data.
 * @returns {Conflict.model} 409 - Date not available.
 */
router.post(
  '/appoiments',
  validationHandler(appoimentInSchema, 'body'),
  async (req, res, next) => {
    try {
      const appoimentData = req.body
      res.status(201).json(appoimentData)
    } catch (error) {
      next(error)
    }
  }
)

/**
 * Create new appoiment and new user
 * @route POST /agenda/appoiments/new
 * @group Agenda - Operations about agenda
 * @param {AppoimentNewPatinetIn.model} appoiment.body.required - The appoiment data
 * @returns {Appoiment.model} 200 - Appoiment info.
 * @returns {BadRequest.model} 400 - Invalid request data.
 * @returns {Conflict.model} 409 - Date not available.
 */
router.post(
  '/appoiments/new',
  validationHandler(appoimentNewPatientInSchema, 'body'),
  async (req, res, next) => {
    try {
      const appoimentData = req.body
      res.status(201).json(appoimentData)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = {
  agendaRouter: router,
}
