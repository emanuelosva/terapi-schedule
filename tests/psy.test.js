/**
 * ******************************
 * @fileoverview Psys e2e testng.
 * ******************************
 */

const supertest = require('supertest')
const { psyMock, sleep } = require('./__mocks__')
const { app } = require('../src/app')

beforeAll(async () => {
  // Wait to db connection.
  jest.setTimeout(10000)
  await sleep(10000)
})

describe('Psys endpoints', () => {
  const request = supertest(app)
  const baseUrl = '/api/psys'

  let pasyId

  describe('POST /psys/signup', () => {
    test('Should return a bad request on invalid body', async (done) => {
      const response = await request
        .post(`${baseUrl}/signup`)
        .set('Accept', 'application/json')
        .send({})

      const { body, status } = response

      expect(status).toEqual(400)
      expect(body.error).toBeTruthy()
      done()
    })

    test('Should return the psychologists created', async (done) => {
      const response = await request
        .post(`${baseUrl}/signup`)
        .set('Accept', 'application/json')
        .send({ ...psyMock })

      const { body, status, headers } = response

      expect(status).toEqual(201)
      expect(headers['set-cookie'][0]).toBeDefined()

      expect(body._id).toBeDefined()
      expect(body.email).toEqual(psyMock.email)

      pasyId = body._id
      done()
    })

    test('Should return a conflict error if existing email', async (done) => {
      const response = await request
        .post(`${baseUrl}/signup`)
        .set('Accept', 'application/json')
        .send({ ...psyMock })

      const { body, status } = response

      expect(status).toEqual(409)
      expect(body.error).toBeTruthy()
      done()
    })
  })

  describe('POST /psys/login', () => {
    test('Should return the psy if exists and set cookie', async (done) => {
      const response = await request
        .post(`${baseUrl}/login`)
        .send({ email: psyMock.email, password: psyMock.password })

      const { body, status, headers } = response

      expect(status).toEqual(200)
      expect(headers['set-cookie'][0]).toBeDefined()
      expect(body._id).toEqual(pasyId)
      expect(body.email).toEqual(psyMock.email)
      done()
    })

    test('Should return unauthorized error on invalid cred.', async (done) => {
      const response = await request
        .post(`${baseUrl}/login`)
        .send({ email: 'invalid@mail.com', password: 'invalid123' })

      const { body, status } = response

      expect(status).toEqual(401)
      expect(body.error).toBeTruthy()
      done()
    })
  })

})
