import request from 'supertest'
import mongoose from 'mongoose'
import app from '../server.js'

describe('GET /api/simulation/history', () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  test('Recupero storico sessione', async () => {

    const sessionId = 'test-session'

    // prima creiamo simulazione
    await request(app)
      .post('/api/simulation')
      .send({
        squareMeters: 60,
        housingType: 'house',
        residents: 3,
        energy: {
          water: 'gas',
          heating: 'gas',
          cooking: 'gas'
        },
        locationId: 'loc1',
        sessionId
      })

    const res = await request(app)
      .get(`/api/simulation/history/${sessionId}`)

    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

})
