/**
 * **************************************
 * @fileoverview Patient bussiness logic.
 * **************************************
 */

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

  async login({ email }) {
    try {
      const patient = await patientDb.read({ query: { email } })
      if (patient) return patient
      return raiseError('Patient not found', httpErrors.notFound)
    } catch (error) {
      return raiseError()
    }
  }
}

module.exports = {
  patientController: new PatientController(),
}
