import axios from 'axios';

const API = axios.create({
  baseURL: 'http://172.30.133.154:4000/api',
  headers: { 'Content-Type': 'application/json' }
});

// Simulazione
export function postSimulation(data) {
  return API.post('/simulation', data).then(res => res.data);
}

// Località
export function getLocations() {
  return API.get('/locations').then(res => res.data);
}

// Confronto
export function getCompare(locationId) {
  return API.get(`/simulation/compare/${locationId}`).then(res => res.data);
}















