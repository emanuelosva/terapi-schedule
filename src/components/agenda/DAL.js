/**
 * ***************************************
 * @fileoverview Agenda Data Access Layer.
 * ***************************************
 */

const { AppoimentModel, DayModel } = require('./model')
const { CRUD } = require('../../lib/db')

class DayDb extends CRUD {
  constructor(DayModel) {}
}

class AppoimentDb extends CRUD {
  constructor(AppoimentModel) {}
}

/**
 * Data Access Layer for Agenda
 */
const agendaDb = {
  day: new DayDb(),
  appoiment: new AppoimentDb(),
}

module.exports = {
  agendaDb,
}
