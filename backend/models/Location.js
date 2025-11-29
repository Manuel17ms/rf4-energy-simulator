const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // e.g., 'tn01'
  name: { type: String, required: true }, // 'Trento - Centro'
  climateFactor: { type: Number, required: true } // multiplicative factor for heating (example)
}, { timestamps: true });

module.exports = mongoose.model('Location', locationSchema);
