/**
 * *************************************
 * @fileoverview Agenda bussiness logic.
 * *************************************
 */

const { appoimentDb } = require('./DAL')
const { agendaDb } = require('../agenda/DAL')
const { raiseError, httpErrors } = require('../../lib/errorManager')
const { config } = require('../../config')
const timeUtils = require('./timeUtils')
const axios = require('axios').default

/**
 * Class to perform appoiments bussiness logic.
 */
class AppoimentController {
  constructor() { }

  async getHours({ psy, selectedDay, duration }) {
    try {
      const dayOfWeek = timeUtils.getDay(selectedDay)
      const agenda = await agendaDb.read({ query: { psy, dayOfWeek } })

      if (!agenda) return []

      const { workingPlan, breaks } = agenda
      const appoiments = await appoimentDb.readMany({
        query: { psy, date: selectedDay },
      })

      const hours = timeUtils.getAvailableHours({
        workingPlan,
        breaks,
        duration: Number(duration),
        appoiments,
      })

      return hours
    } catch (error) {
      return raiseError(error.message)
    }
  }

  async create({ data }) {
    try {
      const selectedDay = data.startTime.split('T')[0].split('-').join('/')
      const { psy, duration } = data

      const availableHours = await this.getHours({ psy, selectedDay, duration })

      const hours = timeUtils.getLocaleHour(data.startTime)
      const minutes = timeUtils.getMinutes(data.startTime)
      const targetHour = `${hours}:${minutes}`

      if (!availableHours.includes(targetHour)) {
        return raiseError('Date not available', httpErrors.conflict)
      }

      return appoimentDb.create({ data: { ...data, date: selectedDay } })
    } catch (error) {
      return raiseError(error.message)
    }
  }

  async createAndRegister({ data }) {
    try {
      let host
      if (config.app.dev) {
        host = `http://${config.app.host}:${config.app.port}`
      } else {
        host = config.app.host
      }

      const { data: _id } = await axios({
        url: `${host}/api/patients/signup`,
        method: 'POST',
        data: data.patient,
      })

      data.patient = _id
      return this.create({ data })
    } catch (error) {
      if (error.response && error.response.status === httpErrors.conflict) {
        return raiseError(error.response.data.detail, httpErrors.conflict)
      }
      return raiseError(error.message)
    }
  }

  async update({ id, data }) {
    const selectedDay = data.startTime.split('T')[0].split('-').join('/')
    const { psy, duration } = data

    const query = { _id: id }
    const appoiment = await appoimentDb.read({ query })
    if (!appoiment) {
      return raiseError('Appoiment not found', httpErrors.notFound)
    }

    let availableHours = await this.getHours({ psy, selectedDay, duration })

    const newHours = timeUtils.getLocaleHour(data.startTime)
    const newMinutes = timeUtils.getMinutes(data.startTime)
    const targetHour = `${newHours}:${newMinutes}`

    const actualDay = appoiment.startTime.split('T')[0].split('-').join('/')
    if (actualDay === selectedDay) {
      const hours = timeUtils.getLocaleHour(appoiment.startTime)
      const minutes = timeUtils.getMinutes(appoiment.startTime)
      const actualHour = `${hours}:${minutes}`
      availableHours = [...availableHours, actualHour]
    }

    if (!availableHours.includes(targetHour)) {
      return raiseError('Date not available', httpErrors.conflict)
    }

    await appoimentDb.update({ query, data: { ...data, date: selectedDay } })
    return { detail: 'Appoiment updated' }
  }

  async delete({ id }) {
    try {
      const query = { _id: id }
      const appoiment = await appoimentDb.read({ query })
      if (!appoiment) {
        return raiseError('Appoiment not found', httpErrors.notFound)
      }

      const timeToAppoiment = timeUtils.diffDateDays(
        appoiment.startTime,
        new Date()
      )
      if (timeToAppoiment < 1) {
        // Only cancel if time is greater than one day.
        return raiseError('The appoiment is so close', httpErrors.conflict)
      }

      await appoimentDb.delete({ query })
      return { detail: 'Appoiment deleted' }
    } catch (error) {
      return raiseError(error.message)
    }
  }
}

module.exports = {
  appoimentController: new AppoimentController(),
}
