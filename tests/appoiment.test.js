/**
 * ***********************************
 * @fileoverview Appoiment e2e testng.
 * ***********************************
 */

const supertest = require('supertest')
const { app } = require('../src/app')
const {
  psyMock,
  agendaMock,
  patientMock,
  appoimentMock,
  appoimentMockUpdate,
  queryConsult,
  noAgendaDay,
  noAgendaTime,
  sleep
} = require('./__mocks__')

beforeAll(async () => {
  // Wait to db connection.
  jest.setTimeout(10000)
  await sleep(10000)
})

describe('Appoiment endpoints', () => {
  const request = supertest(app)
  const baseUrl = '/api/appoiments'

  let psyId
  let psyCookie
  let patientId
  let patientCookie
  let appoimentId

  describe('Psy, Patient, Agenda for test', () => {
    test('Should create psy, agenda, patinet', async (done) => {
      const psyRes = await request
        .post('/api/psys/signup')
        .set('Accept', 'application/json')
        .send({ ...psyMock })

      expect(psyRes.status).toEqual(201)
      psyId = psyRes.body._id
      psyCookie = psyRes.headers['set-cookie'][0]

      const patientRes = await request
        .post('/api/patients/signup')
        .set('Accept', 'application/json')
        .send({ ...patientMock })

      expect(patientRes.status).toEqual(201)
      patientId = patientRes.body._id
      patientCookie = patientRes.headers['set-cookie'][0]

      const agendaRes = await request
        .post('/api/agenda')
        .set('Accept', 'application/json')
        .set('Cookie', psyCookie)
        .send({ ...agendaMock })

      expect(agendaRes.status).toEqual(201)
      done()
    })
  })

  describe('GET /appoiments/hours', () => {
    test('Should response with array of hours', async (done) => {
      const response = await request
        .get(`${baseUrl}/hours`)
        .query({ ...queryConsult, psy: psyId })

      const { body, status } = response

      expect(status).toEqual(200)
      expect(body.hours).toBeDefined()
      expect(body.hours.length).toBeGreaterThan(0)
      done()
    })

    test('Should response with an empty array if not agenda', async (done) => {
      const response = await request
        .get(`${baseUrl}/hours`)
        .query({ ...queryConsult, psy: psyId, selectedDay: noAgendaDay })

      const { body, status } = response

      expect(status).toEqual(200)
      expect(body.hours).toBeDefined()
      expect(body.hours.length).toEqual(0)
      done()
    })

    test('Should response with bad request if invalid query', async (done) => {
      const response = await request
        .get(`${baseUrl}/hours`)
        .query({ ...queryConsult, psy: 'invalid', daySelected: 'invalid' })

      const { body, status } = response

      expect(status).toEqual(400)
      expect(body.error).toBeTruthy()
      done()
    })
  })

  describe('POST /appoiments', () => {
    test('Should response with appoiment created', async (done) => {
      const response = await request
        .post(baseUrl)
        .set('Accept', 'application/json')
        .set('Cookie', patientCookie)
        .send({ ...appoimentMock, psy: psyId, patient: patientId })

      const { body, status } = response
      console.log(body)
      expect(status).toEqual(201)
      expect(body.psy).toEqual(psyId)
      expect(body.patient).toEqual(patientId)
      expect(body.duration).toEqual(appoimentMock.duration)
      expect(body._id).toBeDefined()

      appoimentId = body._id
      done()
    })

    test('Should response with bad request if invalid data', async (done) => {
      const response = await request
        .post(baseUrl)
        .set('Accept', 'application/json')
        .set('Cookie', patientCookie)
        .send({ ...appoimentMock, duration: 'invalidTime' })

      const { body, status } = response

      expect(status).toEqual(400)
      expect(body.error).toBeTruthy()
      done()
    })

    test('Should response with unauthorized error if not cookie', async (done) => {
      const response = await request
        .post(baseUrl)
        .set('Accept', 'application/json')
        .send({ ...appoimentMock })

      const { body, status } = response

      expect(status).toEqual(401)
      expect(body.error).toBeTruthy()
      done()
    })

    test('Should response confilct if unavailble hour', async (done) => {
      const response = await request
        .post(baseUrl)
        .set('Accept', 'application/json')
        .set('Cookie', patientCookie)
        .send({ ...appoimentMock, psy: psyId, patient: patientId })

      const { body, status } = response

      expect(status).toEqual(409)
      expect(body.error).toBeTruthy()
      done()
    })
  })

  describe('PUT /appoiments', () => {
    test('Should return a success response', async (done) => {
      const response = await request
        .put(`${baseUrl}/${appoimentId}`)
        .set('Accept', 'application/json')
        .set('Cookie', patientCookie)
        .send({ ...appoimentMockUpdate, psy: psyId })

      const { body, status } = response

      expect(status).toEqual(200)
      expect(body.detail).toBeDefined()
      done()
    })

    test('Should return bad request if invalid data', async (done) => {
      const response = await request
        .put(`${baseUrl}/${appoimentId}`)
        .set('Accept', 'application/json')
        .set('Cookie', patientCookie)
        .send({})

      const { body, status } = response

      expect(status).toEqual(400)
      expect(body.error).toBeDefined()
      done()
    })

    test('Should return unauthorized error if no cookie', async (done) => {
      const response = await request
        .put(`${baseUrl}/${appoimentId}`)
        .set('Accept', 'application/json')
        .send({ ...appoimentMockUpdate })

      const { body, status } = response

      expect(status).toEqual(401)
      expect(body.error).toBeDefined()
      done()
    })

    test('Should return not found error if invalid id', async (done) => {
      const response = await request
        .put(`${baseUrl}/${patientId}`)
        .set('Accept', 'application/json')
        .set('Cookie', patientCookie)
        .send({ ...appoimentMockUpdate, psy: psyId })

      const { body, status } = response

      expect(status).toEqual(404)
      expect(body.error).toBeDefined()
      done()
    })

    test('Should return a conflict error if unabailable hour', async (done) => {
      const response = await request
        .put(`${baseUrl}/${appoimentId}`)
        .set('Accept', 'application/json')
        .set('Cookie', patientCookie)
        .send({ ...appoimentMockUpdate, startTime: noAgendaTime, psy: psyId })

      const { body, status } = response

      expect(status).toEqual(409)
      expect(body.error).toBeDefined()
      done()
    })
  })

  describe('DELETE /appoiments/{id}', () => {
    test('Should return a success response', async (done) => {
      const response = await request
        .delete(`${baseUrl}/${appoimentId}`)
        .set('Cookie', patientCookie)

      const { body, status } = response

      expect(status).toEqual(200)
      expect(body.detail).toBeDefined()
      done()
    })

    test('Should return a bad request if invalid id', async (done) => {
      const response = await request
        .delete(`${baseUrl}/invalidId`)
        .set('Cookie', patientCookie)

      const { body, status } = response

      expect(status).toEqual(400)
      expect(body.error).toBeTruthy()
      done()
    })

    test('Should return a unauthorized error if no cookie', async (done) => {
      const response = await request
        .delete(`${baseUrl}/${appoimentId}`)

      const { body, status } = response

      expect(status).toEqual(401)
      expect(body.error).toBeTruthy()
      done()
    })

    test('Should return a not foun error if id does not exists', async (done) => {
      const response = await request
        .delete(`${baseUrl}/${appoimentId}`)
        .set('Cookie', patientCookie)

      const { body, status } = response

      expect(status).toEqual(404)
      expect(body.error).toBeTruthy()
      done()
    })
  })
})
