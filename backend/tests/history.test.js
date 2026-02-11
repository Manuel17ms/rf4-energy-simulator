import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import request from 'supertest'
import app from '../server.js'

beforeAll(async () => {

  await connectDB(process.env.MONGODB_URI)

})

afterAll(async () => {

  await mongoose.connection.close()

})

describe('GET history', () => {

  test('Get history', async () => {

    const res = await request(app)
      .get('/api/simulation/history/test-session')

    expect(res.statusCode).toBe(200)

  })

})

