const express = require('express');
const router = express.Router();

// POST /api/simulation
router.post('/simulation', (req, res) => {
  const { squareMeters, housingType, residents, energy, locationId } = req.body;

  // Validazione base
  if (!squareMeters || !housingType || !residents || !energy || !locationId) {
    return res.status(400).json({ message: 'Dati mancanti per la simulazione' });
  }

  // Generiamo valori simulati per test
  const estimatedConsumptionKWh = Math.round(50 + Math.random() * 150);  // esempio casuale
  const co2EquivalentKg = Math.round(20 + Math.random() * 80);           // esempio casuale

  res.json({
    message: 'Simulazione completata!',
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

// GET /api/simulation/compare/:locationId
router.get('/simulation/compare/:locationId', (req, res) => {
  const { locationId } = req.params;

  // Risultati di confronto simulati
  const estimatedConsumptionKWh = Math.round(60 + Math.random() * 140);
  const co2EquivalentKg = Math.round(25 + Math.random() * 75);

  res.json({ estimatedConsumptionKWh, co2EquivalentKg });
});

module.exports = router;


