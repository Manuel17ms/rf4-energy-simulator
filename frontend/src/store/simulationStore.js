import { defineStore } from 'pinia';
import { postSimulation, getLocations, compareLocationApi } from '../api/simulation';

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
    compareResult: null,
    history: [],
    loading: false,
    error: null
  }),

  actions: {
    // ✅ CARICA LOCALITÀ
    async loadLocations() {
      this.loading = true;
      try {
        const res = await getLocations();
        this.locations = res.data;
      } catch (err) {
        this.error = 'Errore caricamento località';
      } finally {
        this.loading = false;
      }
    },

    // ✅ ESEGUI SIMULAZIONE
    async submitSimulation() {
      this.loading = true;
      this.error = null;

      try {
        const res = await postSimulation(this.form);

        // ✅ RISPOSTA OPENAPI
        this.result = res.data;

        // ✅ SALVATAGGIO STORICO CORRETTO
        this.history.unshift({
          date: new Date().toLocaleString(),
          consumption: res.data.estimatedConsumptionKWh,
          co2: res.data.co2EquivalentKg
        });

      } catch (err) {
        this.error = 'Errore chiamata simulazione';
      } finally {
        this.loading = false;
      }
    },

    // ✅ CONFRONTO LOCALITÀ
    async compareLocation(locationId) {
      this.loading = true;
      try {
        const res = await compareLocationApi(locationId);
        this.compareResult = res.data;
      } catch (err) {
        this.error = 'Errore confronto località';
      } finally {
        this.loading = false;
      }
    }
  }
});

