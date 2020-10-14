/**
 * **************************************
 * @fileoverview Patient bussiness logic.
 * **************************************
 */

const bcrypt = require('bcrypt')
const { patientDb } = require('./DAL')
const { raiseError, httpErrors } = require('../../lib/errorManager')

/**
 * Class to perform patient bussiness logic.
 */
class PatientController {
  constructor() {}

  async create({ patientData }) {
    try {
      const firstName = patientData.name.split(' ')[0]
      const lastName = patientData.name.split(' ')[1] || ''
      return patientDb.create({ data: { ...patientData, firstName, lastName } })
    } catch (error) {
      if (error.status && error.status == httpErrors.conflict) return error
      return raiseError()
    }
  }

  async login({ email, password }) {
    try {
      const patient = await patientDb.read({ query: { email } })
      if (patient) {
        const correctPassword = await bcrypt.compare(password, patient.password)
        if (correctPassword) return patient
      }
      return raiseError('Invalid credentials', httpErrors.unauthorized)
    } catch (error) {
      return raiseError()
    }
  }
}

module.exports = {
  patientController: new PatientController(),
}
