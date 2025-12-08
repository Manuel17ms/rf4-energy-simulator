import { defineStore } from 'pinia';
import { postSimulation, getLocations, getCompare } from '../api/simulation';

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
  compareResult: null,

  history: [], // ✅ STORICO RIPRISTINATO

  loading: false,
  error: null
}),


  actions: {
    async loadLocations() {
      this.loading = true;
      try {
        this.locations = await getLocations();
      } catch (err) {
        this.error = err.message || 'Errore caricamento località';
      } finally {
        this.loading = false;
      }
    },

   async submitSimulation() {
  this.loading = true;
  this.error = null;

  try {
    const res = await postSimulation(this.form);

    console.log('RISPOSTA API:', res);

    this.result = res.data;

    // ✅ SALVIAMO NELLO STORICO
    this.history.unshift({
      id: Date.now(),
      date: new Date().toLocaleString(),
      input: { ...this.form },
      output: res.data
    });

  } catch (err) {
    this.error = err.message || 'Errore chiamata API';
  } finally {
    this.loading = false;
  }
},


    async compareLocation(locationId) {
      try {
        const res = await getCompare(locationId);

        console.log('CONFRONTO API:', res);

        this.compareResult = res; // ✅ QUI LO SALVIAMO
      } catch (err) {
        this.error = err.message || 'Errore confronto località';
      }
    }
  }
});









