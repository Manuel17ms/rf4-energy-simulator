import { defineStore } from 'pinia';
import { postSimulation, getLocations } from '../api/simulation';

export const useSimulationStore = defineStore('simulation', {
  state: () => ({
  form: {
    squareMeters: 80,
    housingType: 'apartment',
    residents: 1,
    energy: { water: 'electricity', heating: 'gas', cooking: 'electricity' },
    locationId: ''
  },
  locations: [],
  result: null,
  history: [], 
  loading: false,
  error: null
}),
  actions: {
    async loadLocations() {
      this.loading = true;
      try {
        this.locations = await getLocations();
      } catch (err) {
        this.error = err.message || 'Errore caricamento locations';
      } finally {
        this.loading = false;
      }
    },
   async submitSimulation() {
  this.loading = true;
  this.error = null;

  try {
    const res = await postSimulation(this.form);
    this.result = res.data;

    this.history.push({
      ...res.data,
      date: new Date().toLocaleString()
    });

  } catch (err) {
    this.error = err.message || 'Errore chiamata API';
  } finally {
    this.loading = false;
  }
}

  }
});


