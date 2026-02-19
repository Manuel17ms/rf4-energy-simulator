
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { connectDB } from './config/db.js'
import simulationRoutes from './routes/simulation.routes.js'
import localitaRoutes from './routes/localita.js'




if (process.env.NODE_ENV !== 'production') {
  dotenv.config(); 
}



const app = express()



app.use(cors())
app.use(express.json())
app.get('/health', (req, res) => res.json({ ok: true }))
app.get('/api/health', (req, res) => res.json({ ok: true }))
app.use('/api', simulationRoutes)
app.use('/api', localitaRoutes)


if (process.env.NODE_ENV !== 'test') {
  connectDB(process.env.MONGODB_URI)
}

export default app


if (process.env.NODE_ENV !== 'test') {

  const PORT = process.env.PORT || 4000

  app.listen(PORT, () => {
    console.log('Server running')
  })

}














