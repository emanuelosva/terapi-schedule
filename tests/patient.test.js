/**
 * *******************************
 * @fileoverview Users e2e testng.
 * *******************************
 */

const supertest = require('supertest')
const { patientMock, sleep } = require('./__mocks__')
const { app } = require('../src/app')

beforeAll(async () => {
  // Wait to db connection.
  jest.setTimeout(10000)
  await sleep(10000)
})

describe('Patients endpoints', () => {
  const request = supertest(app)
  const baseUrl = '/api/patients'

  let patientId
  let cookie

  describe('POST /patients/signup', () => {
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

    test('Should return the patient created', async (done) => {
      const response = await request
        .post(`${baseUrl}/signup`)
        .set('Accept', 'application/json')
        .send({ ...patientMock })

      const { body, status, headers } = response
      const cookieSession = headers['set-cookie'][0]

      expect(status).toEqual(201)
      expect(cookieSession).toBeDefined()

      expect(body._id).toBeDefined()
      expect(body.email).toEqual(patientMock.email)

      patientId = body._id
      cookie = cookieSession
      done()
    })

    test('Should return a conflict error if existing email', async (done) => {
      const response = await request
        .post(`${baseUrl}/signup`)
        .set('Accept', 'application/json')
        .send({ ...patientMock })

      const { body, status } = response

      expect(status).toEqual(409)
      expect(body.error).toBeTruthy()
      done()
    })
  })

  describe('POST /patients/login', () => {
    test('Should return the user if exists and set cookie', async (done) => {
      const response = await request
        .post(`${baseUrl}/login`)
        .send({ email: patientMock.email, password: patientMock.password })

      const { body, status, headers } = response

      expect(status).toEqual(200)
      expect(headers['set-cookie'][0]).toBeDefined()
      expect(body._id).toEqual(patientId)
      expect(body.email).toEqual(patientMock.email)
      done()
    })

    test('Should return unauthorized error if unregister user', async (done) => {
      const response = await request
        .post(`${baseUrl}/login`)
        .send({ email: 'invalid@invalidmail.com', password: 'Invalid123' })

      const { body, status } = response

      expect(status).toEqual(401)
      expect(body.error).toBeTruthy()
      done()
    })
  })

  describe('GET /patients', () => {
    test('Should return the current user info', async (done) => {
      const response = await request
        .get(baseUrl)
        .set('Cookie', cookie)

      const { body, status } = response

      expect(status).toEqual(200)
      expect(body._id).toEqual(patientId)
      expect(body.email).toEqual(patientMock.email)
      done()
    })

    test('Should return unauthorized error if not cookie', async (done) => {
      const response = await request.get(baseUrl)

      const { status } = response

      expect(status).toEqual(401)
      done()
    })
  })
})
