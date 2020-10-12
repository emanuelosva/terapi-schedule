/**
 * **********************************
 * @fileoverview Psy bussiness logic.
 * **********************************
 */

const bcrypt = require('bcrypt')
const { psyDb } = require('./DAL')
const { raiseError, httpErrors } = require('../../lib/errorManager')

/**
 * Class to perform psy bussiness logic.
 */
class PsyController {
  constructor() {}

  async create({ psyData }) {
    try {
      return psyDb.create({ data: { ...psyData } })
    } catch (error) {
      if (error.status && error.status == httpErrors.conflict) return error
      return raiseError()
    }
  }

  async login({ email, password }) {
    try {
      const psy = await psyDb.read({ query: { email } })
      if (psy) {
        const correctPassword = await bcrypt.compare(password, psy.password)
        if (correctPassword) return psy
      }
      return raiseError('Invalid credentials', httpErrors.unauthorized)
    } catch (error) {
      return raiseError()
    }
  }
}

module.exports = {
  psyController: new PsyController(),
}
