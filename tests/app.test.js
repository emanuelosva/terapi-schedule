/**
 * ********************************
 * @fileoverview General app tests.
 * ********************************
 */

const supertest = require('supertest')
const { app } = require('../src/app')

describe('General App tests', () => {
  const request = supertest(app)

  test("Should return 404 http status on invalid route", async (done) => {
    const response = await request.get('/invalid-route')
    const { status, body } = response

    expect(status).toEqual(404)
    expect(body).toMatchObject({
      error: true,
      detail: 'Not found'
    })
    done()
  })
})
