const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const simulationRoutes = require('./routes/simulation.routes');
require('dotenv').config();

const app = express();

// Abilita CORS solo per il frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://172.30.133.154:5173']
}));

app.use(express.json());

// Connect DB
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rf4db';
connectDB(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error', err));


// Rotte esistenti
app.use('/api', simulationRoutes);
const localitaRoutes = require('./routes/localita');
app.use('/api', localitaRoutes.router);



// Root
app.get('/', (req, res) => res.json({ message: 'RF4 Simulation Backend' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server listening on port ${PORT}`));





