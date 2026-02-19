const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, 
  name: { type: String, required: true }, 
  climateFactor: { type: Number, required: true } 
}, { timestamps: true });

module.exports = mongoose.model('Location', locationSchema);

