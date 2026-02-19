import express from 'express'
import Simulation from '../models/Simulation.js'
import { localita } from './localita.js'

const router = express.Router()



router.post('/simulation', async (req, res) => {

  try {

    const { squareMeters, housingType, residents, energy, locationId, sessionId } = req.body

    const location = localita.find(l => l.id === locationId)
    const climateFactor = location ? location.climateFactor : 1

    const BASE = 4.5
    const housingFactor = housingType === 'house' ? 1.3 : 1
    const residentsFactor = 1 + (residents - 1) * 0.15
    const energyFactor = energy.heating === 'electricity' ? 1.2 : 1

    const estimatedConsumptionKWh = Math.round(
      squareMeters * BASE * housingFactor * residentsFactor * energyFactor * climateFactor
    )

    const co2EquivalentKg = Math.round(estimatedConsumptionKWh * 0.35)

    const simulation = await Simulation.create({
      squareMeters,
      housingType,
      residents,
      energy,
      locationId,
      estimatedConsumptionKWh,
      co2EquivalentKg,
      sessionId
    })

    res.json(simulation)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }

})



router.get('/simulation/compare/:locationId', (req, res) => {

  const location = localita.find(l => l.id === req.params.locationId)

  if (!location) return res.status(404).json({ error: 'Location not found' })

  const base = 350

  res.json({
    estimatedConsumptionKWh: Math.round(base * location.climateFactor),
    co2EquivalentKg: Math.round(base * location.climateFactor * 0.35)
  })

})



router.get('/simulation/history/:sessionId', async (req, res) => {

  const sims = await Simulation.find({ sessionId: req.params.sessionId })
  res.json(sims)

})

export default router









