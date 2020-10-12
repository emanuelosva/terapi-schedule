/**
 * *************************************
 * @fileoverview Agenda bussiness logic.
 * *************************************
 */

const { agendaDb } = require('./DAL')
const { raiseError, httpErrors } = require('../../lib/errorManager')

/**
 * Class to perform agenda bussiness logic.
 */
class AgendaController {
  constructor() {}

  async create({ psy, days }) {
    try {
      const psyId = psy._id
      const agendaPromises = days.map((day) => {
        return agendaDb.day.upsert({
          query: { psy: psyId, dayOfWeek: day.dayOfWeek },
          data: { ...day, psy: psyId },
        })
      })
      await Promise.all(agendaPromises)
      return { detail: 'Agenda updated' }
    } catch (error) {
      return raiseError(error.message)
    }
  }

  async read({ psy, dayOfWeek }) {
    try {
      const agenda = await agendaDb.day.readMany({ query: { psy: psy._id } })
      if (dayOfWeek) return agenda.filter((day) => day.dayOfWeek === dayOfWeek)
      return agenda
    } catch (error) {
      return raiseError(error.message)
    }
  }

  async update({ psy, dayData }) {
    try {
      await agendaDb.day.update({
        query: { psy: psy._id, dayOfWeek: dayData.dayOfWeek },
        data: { ...dayData },
      })
      return { detail: 'Day updated' }
    } catch (error) {
      return raiseError(error.message)
    }
  }

  async delete({ psy, dayOfWeek }) {
    try {
      await agendaDb.day.delete({ query: { psy: psy._id, dayOfWeek } })
      return { detail: 'Day reseted' }
    } catch (error) {
      return raiseError(error.message)
    }
  }
}

module.exports = {
  agendaController: new AgendaController(),
}
