const express = require('express');
const router = express.Router();
const { localita } = require('./localita');
const Simulation = require('../models/Simulation');

// ===============================
// POST /api/simulation
// ===============================
router.post('/simulation', async (req, res) => {
  try {
    const { squareMeters, housingType, residents, energy, locationId } = req.body;

    if (!squareMeters || !housingType || !residents || !energy || !locationId) {
      return res.status(400).json({ message: 'Dati mancanti per la simulazione' });
    }

    // 🔹 fattore climatico
    const location = localita.find(l => l.id === locationId);
    const climateFactor = location ? location.climateFactor : 1;

    // 🔹 parametri base
    const BASE_KWH_PER_M2 = 4.5;
    const housingFactor = housingType === 'house' ? 1.3 : 1;
    const residentsFactor = 1 + (residents - 1) * 0.15;

    const energyFactor =
      energy.heating === 'electricity' ? 1.2 :
      energy.heating === 'gas' ? 1.0 : 1;

    // 🔹 consumo
    const estimatedConsumptionKWh = Math.round(
      squareMeters *
      BASE_KWH_PER_M2 *
      housingFactor *
      residentsFactor *
      energyFactor *
      climateFactor
    );

    // 🔹 CO₂
    const co2Factor =
      energy.heating === 'electricity' ? 0.40 : 0.22;

    const co2EquivalentKg = Math.round(
      estimatedConsumptionKWh * co2Factor
    );

    const simulation = new Simulation({
      squareMeters,
      housingType,
      residents,
      energy,
      locationId,
      estimatedConsumptionKWh,
      co2EquivalentKg
    });

    await simulation.save();

    res.json({
      message: 'Simulazione completata',
      data: simulation
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ===============================
// GET /api/simulation/compare/:locationId
// ===============================
router.get('/simulation/compare/:locationId', async (req, res) => {
  try {
    const { locationId } = req.params;

    const simulations = await Simulation.find({ locationId });

    if (simulations.length === 0) {
      return res.json({
        estimatedConsumptionKWh: 0,
        co2EquivalentKg: 0
      });
    }

    const avgKWh =
      simulations.reduce((sum, s) => sum + s.estimatedConsumptionKWh, 0) /
      simulations.length;

    const avgCO2 =
      simulations.reduce((sum, s) => sum + s.co2EquivalentKg, 0) /
      simulations.length;

    res.json({
      estimatedConsumptionKWh: Math.round(avgKWh),
      co2EquivalentKg: Math.round(avgCO2)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/simulation/history', async (req, res) => {
  try {
    const simulations = await Simulation
      .find()
      .sort({ createdAt: -1 });

    res.json(simulations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;




