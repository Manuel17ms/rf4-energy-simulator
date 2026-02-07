const mongoose = require('mongoose');

const SimulationSchema = new mongoose.Schema({
  sessionId: String,
  squareMeters: Number,
  housingType: String,
  residents: Number,

  energy: {
    water: String,
    heating: String,
    cooking: String
  },

  locationId: String,

  estimatedConsumptionKWh: Number,
  co2EquivalentKg: Number,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Simulation', SimulationSchema);


