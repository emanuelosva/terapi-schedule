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
