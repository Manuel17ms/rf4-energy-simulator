import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { connectDB } from './config/db.js'
import simulationRoutes from './routes/simulation.routes.js'
import localitaRoutes from './routes/localita.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', simulationRoutes)
app.use('/api', localitaRoutes)

connectDB(process.env.MONGODB_URI)

// export per test
export default app

if (process.env.NODE_ENV !== 'test') {

  const PORT = process.env.PORT || 4000

  app.listen(PORT, () => {
    console.log('Server running')
  })

}





