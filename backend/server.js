const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const simulationRoutes = require('./routes/simulation.routes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect DB
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rf4db';
connectDB(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error', err));

// Routes
app.use('/api', simulationRoutes);
app.use('/api/localita', require('./routes/localita'));


// Root
app.get('/', (req, res) => res.json({ message: 'RF4 Simulation Backend' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

