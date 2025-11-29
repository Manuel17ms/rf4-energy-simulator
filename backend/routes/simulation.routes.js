const express = require('express');
const router = express.Router();
const controller = require('../controllers/simulationController');

// POST /api/simulation
router.post('/simulation', controller.postSimulation);

// GET /api/locations
router.get('/locations', controller.getLocations);

// GET /api/simulation/compare/:locationId
router.get('/simulation/compare/:locationId', controller.compareLocation);

module.exports = router;
