import request from 'supertest'
import mongoose from 'mongoose'
import app from '../server.js'

describe('GET /api/simulation/compare', () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  test('Confronto località valido', async () => {

    const res = await request(app)
      .get('/api/simulation/compare/loc1')

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('estimatedConsumptionKWh')
    expect(res.body).toHaveProperty('co2EquivalentKg')
  })

  test('Località inesistente', async () => {

    const res = await request(app)
      .get('/api/simulation/compare/loc999')

    expect(res.statusCode).toBe(404)
  })

})
