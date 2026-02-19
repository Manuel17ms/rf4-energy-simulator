import { defineStore } from 'pinia';
import { postSimulation, getLocations, getCompare, getHistory } from '../api/simulation';

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

    
    async submitSimulation() {
      this.loading = true;
      this.error = null;

      try {
        
        const sim = await postSimulation({
          ...this.form,
          sessionId: this.sessionId
        });

        console.log("RISPOSTA API:", sim);

        this.result = sim;

        
        this.history.unshift({
          date: new Date(sim.createdAt || Date.now()).toLocaleString(),
          kwh: sim.estimatedConsumptionKWh,
          co2: sim.co2EquivalentKg
        });

        this.compareResult = null;
      } catch (err) {
        this.error = err.message || "Errore chiamata API";
      } finally {
        this.loading = false;
      }
    },

    
    async compareLocation(locationId) {
      try {
        
        const compare = await getCompare(locationId);
        this.compareResult = compare;
      } catch (err) {
        console.error("Errore confronto:", err);
      }
    },

    
    async loadHistory() {
      try {
        
        const sims = await getHistory(this.sessionId);

       
        const sorted = [...sims].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        this.history = sorted.map(sim => ({
          date: new Date(sim.createdAt).toLocaleString(),
          kwh: sim.estimatedConsumptionKWh,
          co2: sim.co2EquivalentKg
        }));
      } catch (err) {
        console.error("Errore storico:", err);
      }
    },

    runSimulation() {
      return this.submitSimulation();
    }
  }
});

















