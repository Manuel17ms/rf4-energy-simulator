import axios from 'axios';

const API_URL = 'http://localhost:3000';

// ✅ INVIO SIMULAZIONE
export async function postSimulation(data) {
  return axios.post(`${API_URL}/simulation`, data);
}

// ✅ CARICAMENTO LOCALITÀ
export async function getLocations() {
  const res = await axios.get(`${API_URL}/locations`);
  return res.data;
}

// ✅ CONFRONTO LOCALITÀ (QUESTA MANCAVA!)
export async function compareLocationApi(locationId) {
  return axios.get(`${API_URL}/simulation/compare/${locationId}`);
}





