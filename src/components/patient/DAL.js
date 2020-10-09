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
  constructor(PatientModel) { }

  async read({ query }) {
    return this._db
      .collection('patients')
      .aggregate({
        from: 'appoiments',
        localField: 'patient',
        foreignField: '_id',
        as: 'appoiments'
      })
  }
}

module.exports = {
  patientDb: new PatientDb()
}
