


const express = require('express');
const router = express.Router();

router.post('/simulation', (req, res) => {
  const { squareMeters, housingType, residents, energy, locationId } = req.body;

  if (!squareMeters || !housingType || !residents || !energy || !locationId) {
    return res.status(400).json({ message: 'Dati mancanti per la simulazione' });
  }

  // 🔹 fattore climatico
  const location = localita.find(l => l.id === locationId);
  const climateFactor = location ? location.climateFactor : 1;

  // 🔹 consumi base
  const BASE_KWH_PER_M2 = 4.5;

  const housingFactor = housingType === 'house' ? 1.3 : 1;
  const residentsFactor = 1 + (residents - 1) * 0.15;

  const energyFactor =
    energy.heating === 'electricity' ? 1.2 :
    energy.heating === 'gas' ? 1.0 : 1;

  // 🔹 consumo finale
  const estimatedConsumptionKWh = Math.round(
    squareMeters *
    BASE_KWH_PER_M2 *
    housingFactor *
    residentsFactor *
    energyFactor *
    climateFactor
  );

  // 🔹 CO₂ (kg/kWh medi)
  const CO2_FACTOR_ELECTRICITY = 0.40;
  const CO2_FACTOR_GAS = 0.22;

  const co2Factor =
    energy.heating === 'electricity'
      ? CO2_FACTOR_ELECTRICITY
      : CO2_FACTOR_GAS;

  const co2EquivalentKg = Math.round(
    estimatedConsumptionKWh * co2Factor
  );

  res.json({
    message: 'Simulazione completata',
    data: {
      squareMeters,
      housingType,
      residents,
      energy,
      locationId,
      estimatedConsumptionKWh,
      co2EquivalentKg
    }
  });
});

// ===============================
// GET /api/simulation/compare/:locationId
// ===============================
router.get('/simulation/compare/:locationId', (req, res) => {
  const { locationId } = req.params;

  const location = localita.find(l => l.id === locationId);
  if (!location) {
    return res.status(404).json({ message: 'Località non trovata' });
  }

  // media realistica basata sul clima
  const baseAverage = 3500;

  const estimatedConsumptionKWh = Math.round(
    baseAverage * location.climateFactor
  );

  const co2EquivalentKg = Math.round(
    estimatedConsumptionKWh * 0.35
  );

  res.json({
    estimatedConsumptionKWh,
    co2EquivalentKg
  });
});

module.exports = router;
