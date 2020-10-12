/**
 * ******************************
 * @fileoverview Patients Router.
 * ******************************
 */

const { Router } = require('express')
const { validationHandler } = require('../../middleware')
const { config } = require('../../config')
const {
  jwt,
  scopes,
  setResponseCookie,
  cookieAuthenticate,
} = require('../../lib/auth')
const { patientInSchema, patientLoginSchema } = require('./schema')
const { patientController } = require('./controller')

/**
 * Router instance
 */
const router = Router()

/**
 * Register a new user
 * @route POST /patients/signup
 * @group Patients - Operations about patients
 * @param {PatientIn.model} patinet.body.required - The patient data
 * @returns {Patient.model} 201 - Patient created and logged
 * @returns {BadRequest.model} 400 - Invalid request data.
 */
router.post(
  '/signup',
  validationHandler(patientInSchema, 'body'),
  async (req, res, next) => {
    try {
      const patientData = req.body

      const patient = await patientController.create({ patientData })
      const token = jwt.signToken({
        email: patient.email,
        scope: scopes.PATIENT,
      })

      // Add cookie session to response
      setResponseCookie({ res, token })
      res.status(201).json(patient)
    } catch (error) {
      next(error)
    }
  }
)

/**
 * Login a user
 * @route POST /patients/login
 * @group Patients - Operations about patients
 * @param {PatientLogin.model} patinet.body.required - The patient data
 * @returns {Patient.model} 200 - Patient created and logged
 * @returns {BadRequest.model} 400 - Invalid request data.
 * @returns {NotFound.model} 404 - Patient not found
 */
router.post(
  '/login',
  validationHandler(patientLoginSchema, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body

      const patient = await patientController.login({ email })
      const token = jwt.signToken({
        email: patient.email,
        scope: scopes.PATIENT,
      })

      // Add cookie session to response
      setResponseCookie({ res, token })
      res.status(200).json(patient)
    } catch (error) {
      next(error)
    }
  }
)

/**
 * Retrieve the data of the current patient
 * @route GET /patients
 * @group Patients - Operations about patients
 * @returns {Patient.model} 200 - Patient created and logged
 * @returns {Unauthorized.model} 401 - Invalid credentials.
 */
router.get(
  '/',
  cookieAuthenticate({ scopes: [scopes.PATIENT] }),
  async (req, res, next) => {
    try {
      const { user } = req
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = {
  patientRouter: router,
}
