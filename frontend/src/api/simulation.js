import axios from 'axios';

const API = axios.create({
  baseURL: 'http://172.30.133.154:4000/api', // <- IP reale della macchina
  headers: { 'Content-Type': 'application/json' }
});

export function postSimulation(data) {
  return API.post('/simulation', data).then(res => res.data);
}

export function getLocations() {
  return API.get('/localita').then(res => res.data);
}


export function getCompare(locationId) {
  return API.get(`/simulation/compare/${locationId}`).then(res => res.data);
}




