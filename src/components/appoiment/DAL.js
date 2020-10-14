/**
 * ***************************************
 * @fileoverview Agenda Data Access Layer.
 * ***************************************
 */

const { AppoimentModel } = require('./model')
const { CRUD } = require('../../lib/db')

class AppoimentDb extends CRUD {
  constructor() {
    super(AppoimentModel)
  }
}

module.exports = {
  appoimentDb: new AppoimentDb(),
}
