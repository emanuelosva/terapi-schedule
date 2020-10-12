/**
 * ****************************************
 * @fileoverview Patient Data Access Layer.
 * ****************************************
 */

const { PatientModel } = require('./model')
const { CRUD } = require('../../lib/db')

/**
 * Data Access Layer for Patient model
 */
class PatientDb extends CRUD {
  constructor() {
    super(PatientModel)
  }
}

module.exports = {
  patientDb: new PatientDb(),
}
