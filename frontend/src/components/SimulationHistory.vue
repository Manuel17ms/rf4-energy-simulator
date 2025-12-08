<template>
  <div>
    <h2>📊 Storico Simulazioni</h2>

    <p v-if="store.history.length === 0">
      Nessuna simulazione effettuata.
    </p>

    <ul v-else>
      <li v-for="(item, index) in store.history" :key="index">
        📅 {{ item.date }} —
        🔋 {{ item.consumption }} kWh —
        🌱 {{ item.co2 }} kg CO₂
      </li>
    </ul>
  </div>
</template>

<script>
import { useSimulationStore } from '../store/simulationStore';

export default {
  name: 'SimulationHistory',
  setup() {
    const store = useSimulationStore();
    return { store };
  }
};
</script>
