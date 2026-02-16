
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
app.get('/health', (req, res) => res.json({ ok: true }));
import { connectDB } from './config/db.js'
import simulationRoutes from './routes/simulation.routes.js'
import localitaRoutes from './routes/localita.js'


import dotenv from 'dotenv';


if (process.env.NODE_ENV !== 'production') {
  dotenv.config(); 
}



const app = express()



app.use(cors())
app.use(express.json())

app.use('/api', simulationRoutes)
app.use('/api', localitaRoutes)

// 🔥 collega DB SOLO se non sei in test
if (process.env.NODE_ENV !== 'test') {
  connectDB(process.env.MONGODB_URI)
}

export default app

// start server solo fuori test
if (process.env.NODE_ENV !== 'test') {

  const PORT = process.env.PORT || 4000

  app.listen(PORT, () => {
    console.log('Server running')
  })

}










