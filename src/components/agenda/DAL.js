/**
 * ***************************************
 * @fileoverview Agenda Data Access Layer.
 * ***************************************
 */

const { DayModel } = require('./model')
const { CRUD } = require('../../lib/db')

class DayDb extends CRUD {
  constructor() {
    super(DayModel)
  }
}

module.exports = {
  agendaDb: new DayDb(),
}
