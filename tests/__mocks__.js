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
      "dayOfWeek": "Monday",
      "workingPlan": {
        "start": "10:00",
        "end": "18:00"
      },
      "breaks": []
    },
    {
      "dayOfWeek": "Friday",
      "workingPlan": {
        "start": "12:00",
        "end": "18:00"
      },
      "breaks": [
        {
          start: '15:00',
          end: '16:00'
        }
      ]
    }
  ]
}
