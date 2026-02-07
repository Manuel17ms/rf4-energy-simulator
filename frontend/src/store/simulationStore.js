
import { defineStore } from 'pinia';
import { postSimulation, getLocations, getCompare, getHistory } from '../api/simulation';


// ✅ genera sessionId una sola volta
let sessionId = sessionStorage.getItem('sessionId');

if (!sessionId) {
  sessionId = crypto.randomUUID();
  sessionStorage.setItem('sessionId', sessionId);
}


export const useSimulationStore = defineStore('simulation', {

  state: () => ({
    sessionId,

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

    // =========================
    // Carica località
    // =========================
    async loadLocations() {
      this.loading = true;

      try {
        const res = await getLocations();
        this.locations = res.data;
      } catch {
        this.error = 'Errore caricamento località';
      } finally {
        this.loading = false;
      }
    },


    // =========================
    // Invia simulazione
    // =========================
    async submitSimulation() {

      this.loading = true;
      this.error = null;

      try {

        const res = await postSimulation({
          ...this.form,
          sessionId: this.sessionId
        });

        console.log("RISPOSTA API:", res.data);

        this.result = res.data;

        // aggiorna storico locale
        this.history.unshift({
          date: new Date().toLocaleString(),
          kwh: res.data.estimatedConsumptionKWh,
          co2: res.data.co2EquivalentKg
        });

        this.compareResult = null;

      } catch (err) {
        this.error = err.message || "Errore chiamata API";
      }
      finally {
        this.loading = false;
      }
    },


    // =========================
    // Confronto località
    // =========================
    async compareLocation(locationId) {

      try {
        const res = await getCompare(locationId);
        this.compareResult = res.data;
      }
      catch (err) {
        console.error("Errore confronto:", err);
      }
    },


    // =========================
    // Carica storico Mongo
    // =========================
    async loadHistory() {

      try {

        const data = await getHistory(this.sessionId);

        this.history = data.map(sim => ({
          date: new Date(sim.createdAt).toLocaleString(),
          kwh: sim.estimatedConsumptionKWh,
          co2: sim.co2EquivalentKg
        }));

      }
      catch (err) {
        console.error("Errore storico:", err);
      }
    },


    // alias compatibilità
    runSimulation() {
      return this.submitSimulation();
    }

  }

});






















