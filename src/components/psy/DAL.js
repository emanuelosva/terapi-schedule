/**
 * **********************************************
 * @fileoverview Psychologists Data Access Layer.
 * **********************************************
 */

const { PsyModel } = require('./model')
const { CRUD } = require('../../lib/db')

/**
 * Data Access Layer for Psy model
 */
class PsyDb extends CRUD {
  constructor(PsyModel) { }
}

module.exports = {
  psyDb: new PsyDb()
}
