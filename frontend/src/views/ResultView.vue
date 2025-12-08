<template>
  <div style="max-width: 800px; margin: auto; padding: 2rem;">

    <h1>RF4 — Simulazione Consumo Energetico</h1>

    <!-- Torna alla home -->
    <button @click="goHome" style="margin-bottom: 1.5rem;">
      ← Nuova simulazione
    </button>

    <!-- RISULTATO -->
    <div v-if="store.result" style="margin-bottom: 2rem;">
      <h2>Risultato Simulazione</h2>
      <p><strong>Consumo:</strong> {{ store.result.estimatedConsumptionKWh }} kWh</p>
      <p><strong>CO₂:</strong> {{ store.result.co2EquivalentKg }} kg</p>
    </div>

    <hr />

    <!-- CONFRONTO -->
    <LocationCompare />

    <hr />

    <!-- STORICO -->
    <SimulationHistory />

  </div>
</template>

<script>
import { useSimulationStore } from '../store/simulationStore';
import LocationCompare from '../components/LocationCompare.vue';
import SimulationHistory from '../components/SimulationHistory.vue';

export default {
  name: 'ResultView',
  components: {
    LocationCompare,
    SimulationHistory
  },
  setup() {
    const store = useSimulationStore();

    function goHome() {
      window.location.href = '/';
    }

    return {
      store,
      goHome
    };
  }
};
</script>

<style scoped>
h1 {
  margin-bottom: 1rem;
}

h2 {
  margin-top: 1.5rem;
}

hr {
  margin: 2rem 0;
}
</style>


