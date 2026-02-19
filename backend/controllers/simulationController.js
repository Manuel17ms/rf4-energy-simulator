const Location = require('../models/Location');
const Simulation = require('../models/Simulation');



const ENERGY_CO2 = {
  electricity: 0.35, 
  gas: 0.20
};

function calcBaseConsumption(squareMeters, housingType) {
  const basePerM2 = housingType === 'house' ? 40 : 30; 
  return squareMeters * basePerM2;
}

function calcResidentsAddition(residents) {
  
  return residents * 300; 
}

exports.postSimulation = async (req, res) => {
  try {
    const payload = req.body;
    const {
      squareMeters = 80,
      housingType = 'apartment',
      residents = 1,
      energy = { water: 'electricity', heating: 'gas', cooking: 'electricity' },
      locationId
    } = payload;

    
    let location = null;
    if (locationId) {
      location = await Location.findOne({ id: locationId });
    }
    const climateFactor = (location && location.climateFactor) ? location.climateFactor : 1.0;

   
    const base = calcBaseConsumption(squareMeters, housingType);
    const residentsExtra = calcResidentsAddition(residents);

    
    const heatingShare = base * 0.4 * climateFactor;
    
    const otherShare = base * 0.6;

    
    const heatingKWh = heatingShare;
    const waterKWh = residents * 150; 
    const cookingKWh = residents * 100; 

    const totalKWh = Math.round(heatingKWh + otherShare + waterKWh + cookingKWh + residentsExtra);

  
    const co2Heating = heatingKWh * (ENERGY_CO2[energy.heating] || ENERGY_CO2.electricity);
    const co2Water = waterKWh * (ENERGY_CO2[energy.water] || ENERGY_CO2.electricity);
    const co2Cooking = cookingKWh * (ENERGY_CO2[energy.cooking] || ENERGY_CO2.electricity);
    const co2Other = otherShare * ENERGY_CO2.electricity;

    const totalCo2Kg = Math.round((co2Heating + co2Water + co2Cooking + co2Other) * 10) / 10;

  
    let locationAverage = {
      estimatedConsumptionKWh: Math.round(totalKWh * (location ? (1 + (location.climateFactor - 1) * 0.9) : 1.05)),
      co2EquivalentKg: Math.round(totalCo2Kg * (location ? (1 + (location.climateFactor - 1) * 0.9) : 1.05))
    };


    const sim = new Simulation({
      squareMeters, housingType, residents, energy, locationId,
      estimatedConsumptionKWh: totalKWh,
      co2EquivalentKg: totalCo2Kg
    });
    await sim.save();

    res.json({
      estimatedConsumptionKWh: totalKWh,
      co2EquivalentKg: totalCo2Kg,
      locationAverage
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getLocations = async (req, res) => {
  try {
    const locs = await Location.find({}, { _id: 0, __v: 0 });
    res.json(locs);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving locations', error: err.message });
  }
};

exports.compareLocation = async (req, res) => {
  try {
    const { locationId } = req.params;
    const location = await Location.findOne({ id: locationId });
    if (!location) return res.status(404).json({ message: 'Location not found' });

    
    const baseAvg = 3500; 
    const estimatedConsumptionKWh = Math.round(baseAvg * location.climateFactor);
    const co2EquivalentKg = Math.round(estimatedConsumptionKWh * 0.3);

    res.json({ estimatedConsumptionKWh, co2EquivalentKg });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

