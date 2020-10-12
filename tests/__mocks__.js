/**
 * **************************
 * @fileoverview Tests mocks.
 * **************************
 */

const { nanoid } = require('nanoid')

module.exports.patientMock = {
  email: `${nanoid()}@mail.com`,
  name: 'Petter Parker',
  cel: '+5254298632',
  zoomId: '910 8957 2648'
}
