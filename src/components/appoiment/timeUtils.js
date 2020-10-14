/**
 * *****************************
 * @fileoverview Time utilities.
 * *****************************
 */

/**
 * Parse a string format hour (10:00) to absolute minutes.
 * @param {string} stringHour - The hour to parse to minutes
 */
const absoluteMinutes = (stringHour) => {
  const hourMinutes = stringHour.split(':')
  const hours = Number(hourMinutes[0])
  const minutes = Number(hourMinutes[1])
  return hours * 60 + minutes
}

/**
 * Get back the string hour format from absolute minutes time.
 * @param {number} absoluteMinutes - The ansolute hour in minutes
 */
const minutesToStringTime = (absoluteMinutes) => {
  const hours = Math.floor(absoluteMinutes / 60)
  const minutes = absoluteMinutes - hours * 60
  return `${hours}:${minutes}`
}

const getHour = (date) => new Date(date).getHours()
const getMinutes = (date) => new Date(date).getMinutes()

const getLocaleHour = (date) => {
  const utcHour = Number(
    new Date(date).toUTCString().split(' ')[4].split(':')[0]
  )
  const tzOffset = Number(date.split('T')[1].split(':')[0]) - utcHour
  return utcHour + tzOffset
}

/**
 * Return the hours taked by preexisting appoiments.
 * @param {Array} appoiments - An array of appoiments
 */
const getTakedTime = (appoiments) => {
  return appoiments.map((a) => {
    return {
      start: `${getLocaleHour(a.startTime)}:${getMinutes(a.startTime)}`,
      end: `${getLocaleHour(a.endTime)}: ${getMinutes(a.endTime)}`,
    }
  })
}

/**
 * Return a boolean value indicating if the current session time
 * (hour - endSession) is in some unavailable period.
 * @param {Array} unavailableRanges - Array of invalid time ranges
 * @param {number} hour - The appoiment start hour
 * @param {number} endSession - The appoiment end hour
 */
const checkIfInvalidTime = (unavailableRanges, hour, endSession) => {
  const timeTaked = unavailableRanges.reduce((taked, range) => {
    if (
      (range.start <= hour && range.end >= endSession) ||
      (range.start < endSession && range.end > endSession) ||
      (range.start <= hour && range.end >= hour) ||
      (range.start >= hour && range.end <= endSession)
    ) {
      return taked + 1
    }
    return taked
  }, 0)
  return Boolean(timeTaked)
}

/**
 * Return an array with the available hours that matches the psy agenda
 * and the duration of session.
 * @param {object} workingPlan - The day working plan - { start: 10:00, end: 18:00 }
 * @param {Array} breaks - Array with the current breaks of day
 * @param {number} duration - The duration of session in minutes
 * @param {Array} appoiments - An array with prexisting appoiments
 */
const getAvailableHours = ({ workingPlan, breaks, duration, appoiments }) => {
  // Convert start & end to absolute minutes time
  const start = absoluteMinutes(workingPlan.start)
  const end = absoluteMinutes(workingPlan.end)

  // Convert unavailable hours to absolute minutes ranges
  const takedTime = getTakedTime(appoiments).map((b) => {
    return {
      start: absoluteMinutes(b.start),
      end: absoluteMinutes(b.end),
    }
  })
  const breaksTime = breaks.map((b) => {
    return {
      start: absoluteMinutes(b.start),
      end: absoluteMinutes(b.end),
    }
  })

  let availableHours = []
  let hour = start

  while (hour < end) {
    const endSession = hour + duration
    const inBreak = checkIfInvalidTime(breaksTime, hour, endSession)
    const takedHour = checkIfInvalidTime(takedTime, hour, endSession)

    if (!inBreak && !takedHour && endSession <= end) {
      availableHours = [...availableHours, minutesToStringTime(hour)]
    }
    // Increments in one hour (60 minutes)
    hour += 60
  }
  return availableHours
}

/**
 * Return the day of week.
 * @param {Date} date - Date to get day of week
 */
const getDay = (date) => {
  return new Date(date).toLocaleString('en-us', { weekday: 'long' })
}

const diffDateDays = (dateGrather, date) => {
  const diff = Math.abs(new Date(dateGrather) - new Date(date))
  const msToDays = 1000 * 3600 * 24
  return diff / msToDays
}

module.exports = {
  getDay,
  getAvailableHours,
  diffDateDays,
  getHour,
  getMinutes,
  getLocaleHour,
}
