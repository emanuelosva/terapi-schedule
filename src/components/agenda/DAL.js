/**
 * ***************************************
 * @fileoverview Agenda Data Access Layer.
 * ***************************************
 */

const { AppoimentModel, DayModel } = require('./model')
const { CRUD } = require('../../lib/db')

class DayDb extends CRUD {
  constructor() {
    super(DayModel)
  }
}

class AppoimentDb extends CRUD {
  constructor() {
    super(AppoimentModel)
  }
}

module.exports = {
  agendaDb: {
    day: new DayDb(),
    appoiment: new AppoimentDb(),
  },
}
