/**
 * *******************************
 * @fileoverview Appoiment Router.
 * *******************************
 */

const { Router } = require('express')
const { validationHandler } = require('../../middleware')
const { appoimentController } = require('./controller')
const {
  scopes,
  cookieAuthenticate,
  setResponseCookie,
  jwt,
} = require('../../lib/auth')
const {
  idSchema,
  appoimentConsultSchema,
  appoimentInSchema,
  appoimentUpdateSchema,
  appoimentNewPatientInSchema,
} = require('./schema')

/**
 * Router instance
 */
const router = Router()

/**
 * Get available appoiment hours
 * @route GET /appoiments/hours
 * @group Appoiments - Operations about appioments
 * @param {string} psy.query.required - The psy id - eg: jzzdO3o56N-aU3s1bQUfd
 * @param {string} duration.query.required - Appoiment duration - eg: 50
 * @param {string} selectedDay.query.required - Desired day - eg: 2020/10/19
 * @returns {Hours.model} 200 - Availbale hours - eg: [14:00, 15:00]
 * @returns {BadRequest.model} 400 - Invalid request data.
 */
router.get(
  '/hours',
  validationHandler(appoimentConsultSchema, 'query'),
  async (req, res, next) => {
    try {
      const { psy, duration, selectedDay } = req.query
      const hours = await appoimentController.getHours({
        psy,
        duration,
        selectedDay,
      })
      res.status(200).json({ hours })
    } catch (error) {
      next(error)
    }
  }
)

/**
 * Create new appoiment
 * @route POST /appoiments
 * @group Appoiments - Operations about appoiments
 * @param {AppoimentIn.model} appoiment.body.required - The appoiment data
 * @returns {Appoiment.model} 201 - Appoiment info.
 * @returns {BadRequest.model} 400 - Invalid request data.
 * @returns {Conflict.model} 409 - Date not available.
 * @security COOKIE
 */
router.post(
  '/',
  cookieAuthenticate({ scopes: [scopes.PATIENT] }),
  validationHandler(appoimentInSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body
      const appoiment = await appoimentController.create({ data })
      res.status(201).json(appoiment)
    } catch (error) {
      next(error)
    }
  }
)

/**
 * Create new appoiment and new user
 * @route POST /appoiments/new
 * @group Appoiments - Operations about appoiments
 * @param {AppoimentNewPatinetIn.model} appoiment.body.required - The appoiment data
 * @returns {Appoiment.model} 201 - Appoiment info.
 * @returns {BadRequest.model} 400 - Invalid request data.
 * @returns {Conflict.model} 409 - Date not available.
 */
router.post(
  '/new',
  validationHandler(appoimentNewPatientInSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body
      const appoiment = await appoimentController.createAndRegister({ data })
      const token = jwt.signToken({
        email: data.patinent.email,
        scope: scopes.PATIENT,
      })

      setResponseCookie({ res, token })
      res.status(201).json(appoiment)
    } catch (error) {
      next(error)
    }
  }
)

/**
 * Update appoiment
 * @route PUT /appoiments/{id}
 * @group Appoiments - Operations about appoiments
 * @param {string} id.path.required - The appoiment data
 * @param {AppoimentUpdate.model} appioment.body.required - The new data
 * @returns {Success.model} 200 - Appoiment info.
 * @returns {BadRequest.model} 400 - Invalid request data.
 * @returns {Unauthorized.model} 401 - Invalid request data.
 * @returns {NotFound.model} 404 - Not found.
 * @returns {Conflict.model} 409 - Date not available.
 * @security COOKIE
 */
router.put(
  '/:id',
  cookieAuthenticate({ scopes: [scopes.PATIENT] }),
  validationHandler(idSchema, 'params'),
  validationHandler(appoimentUpdateSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const data = req.body
      const result = await appoimentController.update({ id, data })
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
)

/**
 * Delete appoiment
 * @route DELETE /appoiments/{id}
 * @group Appoiments - Operations about appoiments
 * @param {string} id.path.required - The appoiment data
 * @returns {Success.model} 200 - Appoiment info.
 * @returns {BadRequest.model} 400 - Invalid request data.
 * @returns {Unauthorized.model} 401 - Invalid request data.
 * @returns {NotFound.model} 404 - Not found.
 * @returns {Conflict.model} 409 - Time to cancel expired.
 * @security COOKIE
 */
router.delete(
  '/:id',
  cookieAuthenticate({ scopes: [scopes.PATIENT] }),
  validationHandler(idSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await appoimentController.delete({ id })
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = {
  appoimenRouter: router,
}
