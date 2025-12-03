router.post('/simulation', (req, res) => {
  const { squareMeters, housingType, residents, energy, locationId } = req.body;

  res.json({
    message: 'Simulazione completata!',
    data: {
      squareMeters,
      housingType,
      residents,
      energy,
      locationId,
      estimatedConsumptionKWh: 100 + Math.random()*50, // esempio casuale
      co2EquivalentKg: 50 + Math.random()*20             // esempio casuale
    }
  });
});


