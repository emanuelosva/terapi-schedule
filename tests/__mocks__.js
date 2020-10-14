/**
 * **************************
 * @fileoverview Tests mocks.
 * **************************
 */

const { nanoid } = require('nanoid')
const { promisify } = require('util')

module.exports.sleep = promisify(setTimeout)

module.exports.patientMock = {
  email: `${nanoid()}@mail.com`,
  name: 'Petter Parker',
  cel: '+5254298632',
  zoomId: '910 8957 2648'
}

module.exports.psyMock = {
  email: `${nanoid()}@mail.com`,
  password: 'Testing123',
  firstName: 'Mystery',
  lastName: 'Marvel',
  cedula: '1234567',
  description: 'Some description for test functionalities...'
}

module.exports.agendaMock = {
  days: [
    {
      'dayOfWeek': 'Monday',
      'workingPlan': {
        'start': '10:00',
        'end': '18:00'
      },
      'breaks': []
    },
    {
      'dayOfWeek': 'Friday',
      'workingPlan': {
        'start': '12:00',
        'end': '18:00'
      },
      'breaks': [
        {
          start: '15:00',
          end: '16:00'
        }
      ]
    }
  ]
}

module.exports.queryConsult = {
  selectedDay: '2020/10/26',
  duration: 30,
}

module.exports.noAgendaDay = '2020/10/29'
module.exports.noAgendaTime = '2020-10-26T23:00:03-05:00'

module.exports.appoimentMock = {
  psy: '',
  patient: '',
  startTime: '2020-10-26T10:00:00-05:00',
  endTime: '2020-10-26T10:50:00-05:00',
  duration: 50
}

module.exports.appoimentMockUpdate = {
  psy: '',
  startTime: '2020-10-26T11:00:00-05:00',
  endTime: '2020-10-26T11:50:00-05:00',
  duration: 50
}
