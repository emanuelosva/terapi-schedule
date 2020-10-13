/**
 * ********************************
 * @fileoverview Agenda e2e testng.
 * ********************************
 */

const supertest = require('supertest')
const { psyMock, agendaMock, sleep } = require('./__mocks__')
const { app } = require('../src/app')

beforeAll(async () => {
  // Wait to db connection.
  jest.setTimeout(10000)
  await sleep(10000)
})

describe('Agenda endpoints', () => {
  const request = supertest(app)
  const baseUrl = '/api/agenda'

  let psyId
  let cookieSession

  describe('POST /agenda', () => {
    test('Should return a success response', async (done) => {
      const authRes = await request
        .post('/api/psys/signup')
        .set('Accept', 'application/json')
        .send({ ...psyMock })

      psyId = authRes.body._id
      cookieSession = authRes.headers['set-cookie'][0]

      const response = await request
        .post(baseUrl)
        .set('Cookie', cookieSession)
        .set('Accept', 'application/json')
        .send({ ...agendaMock })

      const { body, status } = response
      expect(status).toEqual(201)
      expect(body.detail).toBeDefined()
      done()
    })

    test('Should return a unauthorized error if not cookie', async (done) => {
      const response = await request
        .post(baseUrl)
        .set('Accept', 'application/json')
        .send({ ...agendaMock })

      const { body, status } = response
      expect(status).toEqual(401)
      expect(body.error).toBeTruthy()
      done()
    })

    test('Should return a bad request error on invalid data', async (done) => {
      const response = await request
        .post(baseUrl)
        .set('Cookie', cookieSession)
        .set('Accept', 'application/json')
        .send({ days: { dayOfWeek: 'invalid' } })

      const { body, status } = response
      expect(status).toEqual(400)
      expect(body.error).toBeTruthy()
      done()
    })
  })

  describe('GET /agenda', () => {
    test('Should return all agended days', async (done) => {
      const response = await request
        .get(baseUrl)
        .set('Cookie', cookieSession)

      const { body, status } = response
      expect(status).toEqual(200)
      expect(body.agenda).toHaveLength(agendaMock.days.length)
      expect(body.agenda[0]).toHaveProperty('psy', psyId)
      done()
    })

    test('Should return the day in query', async (done) => {
      const dayOfWeek = agendaMock.days[0].dayOfWeek
      const response = await request
        .get(baseUrl)
        .set('Cookie', cookieSession)
        .query({ dayOfWeek })

      const { body, status } = response
      expect(status).toEqual(200)
      expect(body.agenda).toHaveLength(1)
      expect(body.agenda[0]).toHaveProperty('dayOfWeek', dayOfWeek)
      expect(body.agenda[0]).toHaveProperty('psy', psyId)
      done()
    })

    test('Should return unauthorized error if not cookie', async (done) => {
      const response = await request
        .get(baseUrl)

      const { body, status } = response
      expect(status).toEqual(401)
      expect(body.error).toBeTruthy()
      done()
    })
  })

  describe('PUT /agenda', () => {
    test('Should return a success response', async (done) => {
      const response = await request
        .put(baseUrl)
        .set('Cookie', cookieSession)
        .set('Accept', 'application/json')
        .send({ ...agendaMock.days[0], breaks: [] })

      const { body, status } = response
      expect(status).toEqual(200)
      expect(body.detail).toBeDefined()
      done()
    })

    test('Should return a unauthorized error if no cookie', async (done) => {
      const response = await request
        .put(baseUrl)
        .set('Accept', 'application/json')
        .send({ ...agendaMock.days[0], breaks: [] })

      const { body, status } = response
      expect(status).toEqual(401)
      expect(body.error).toBeTruthy()
      done()
    })

    test('Should return a bad request on invalid data', async (done) => {
      const response = await request
        .put(baseUrl)
        .set('Cookie', cookieSession)
        .set('Accept', 'application/json')
        .send({ ...agendaMock.days[0], breaks: [{ end: '120:invalid' }] })

      const { body, status } = response
      expect(status).toEqual(400)
      expect(body.error).toBeTruthy()
      done()
    })
  })

  describe('DELETE /agenda/{dayOfWeek}', () => {
    test('Should return a success response', async (done) => {
      const dayOfWeek = agendaMock.days[0].dayOfWeek
      const response = await request
        .delete(`${baseUrl}/${dayOfWeek}`)
        .set('Cookie', cookieSession)

      const { body, status } = response
      expect(status).toEqual(200)
      expect(body.detail).toBeDefined()
      done()
    })

    test('Should return a bad request on invalid param', async (done) => {
      const response = await request
        .delete(`${baseUrl}/invalid`)
        .set('Cookie', cookieSession)

      const { body, status } = response
      expect(status).toEqual(400)
      expect(body.error).toBeTruthy()
      done()
    })
  })
})
