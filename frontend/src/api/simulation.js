import axios from 'axios';

const API = axios.create({
  // Usa la variabile d'ambiente VITE_API_URL se definita,
  // altrimenti punta direttamente al backend su 127.0.0.1:4000
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:4000/api',
  headers: { 'Content-Type': 'application/json' }
});

export function postSimulation(data) {
  return API.post('/simulation', data).then(res => res.data);
}

export function getLocations() {
  return API.get('/locations').then(res => res.data);
}

export function getCompare(locationId) {
  return API.get(`/simulation/compare/${locationId}`).then(res => res.data);
}

// export function getSimulationHistory(userId) {
//   return API.get(`/simulation/history/${userId}`).then(res => res.data);
// }


