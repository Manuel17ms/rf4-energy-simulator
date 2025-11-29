const mongoose = require('mongoose');

const simulationSchema = new mongoose.Schema({
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
  co2EquivalentKg: Number
}, { timestamps: true });

module.exports = mongoose.model('Simulation', simulationSchema);
