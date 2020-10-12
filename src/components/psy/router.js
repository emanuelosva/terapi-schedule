/**
 * **************************
 * @fileoverview Psys Router.
 * **************************
 */

const { Router } = require('express')
const { validationHandler } = require('../../middleware')
const { jwt, scopes, setResponseCookie } = require('../../lib/auth')
const { psyInSchema, psyLoginSchema } = require('./schema')
const { psyController } = require('./controller')

/**
 * Router instance
 */
const router = Router()

/**
 * Register a new psychologists
 * @route POST /psys/signup
 * @group Psychologists - Operations about psychologists
 * @param {PsyIn.model} psy.body.required - The Psychologists data
 * @returns {Psy.model} 201 - Psychologists created and logged
 * @returns {BadRequest.model} 400 - Invalid request data.
 */
router.post(
  '/signup',
  validationHandler(psyInSchema, 'body'),
  async (req, res, next) => {
    try {
      const psyData = req.body

      const psy = await psyController.create({ psyData })
      const token = jwt.signToken({ email: psy.email, scope: scopes.PSY })

      // Add cookie session to response
      setResponseCookie({ res, token })
      res.status(201).json(psy)
    } catch (error) {
      next(error)
    }
  }
)

/**
 * Login a psychologists
 * @route POST /psys/login
 * @group Psychologists - Operations about psychologists
 * @param {PsyLogin.model} credentials.body.required - The psy credentials
 * @returns {Psy.model} 200 - Psychologists created and logged
 * @returns {BadRequest.model} 400 - Invalid request data.
 * @returns {Unauthorized.model} 401 - Invalid Credentials
 */
router.post(
  '/login',
  validationHandler(psyLoginSchema, 'body'),
  async (req, res, next) => {
    try {
      const { email, password } = req.body

      const psy = await psyController.login({ email, password })
      const token = jwt.signToken({ email: psy.email, scope: scopes.PSY })

      // Add cookie session to response
      setResponseCookie({ res, token })
      res.status(200).json(psy)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = {
  psyRouter: router,
}
