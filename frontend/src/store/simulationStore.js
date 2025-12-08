import { defineStore } from 'pinia';
import { postSimulation, getLocations, getCompare } from '../api/simulation';

export const useSimulationStore = defineStore('simulation', {
  state: () => ({
    form: {
      squareMeters: 80,
      housingType: 'apartment',
      residents: 1,
      energy: {
        water: 'electricity',
        heating: 'gas',
        cooking: 'electricity'
      },
      locationId: ''
    },

    locations: [],
    result: null,

    // ✅ STORICO VERO
    history: [],

    // ✅ CONFRONTO
    compareResult: null,

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

        // ✅ RISULTATO ATTUALE
        this.result = res.data.data;

        // ✅ SALVATAGGIO NELLO STORICO
        this.history.unshift({
          date: new Date().toLocaleString(),
          consumption: this.result.estimatedConsumptionKWh,
          co2: this.result.co2EquivalentKg
        });

      } catch (err) {
        this.error = err.message || 'Errore chiamata API';
      } finally {
        this.loading = false;
      }
    },

    // ✅ CONFRONTO TRA LOCALITÀ
    async compareLocation(locationId) {
      try {
        const res = await compareLocationApi(locationId);
        this.compareResult = res.data.data;
      } catch (err) {
        console.error('Errore confronto:', err);
      }
    }
  }
});

