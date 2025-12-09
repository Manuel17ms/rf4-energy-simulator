<template>
  <div>
    <button @click="goBack" style="margin-bottom:1rem;">← Nuova simulazione</button>

    <!-- ✅ RISULTATO PRINCIPALE -->
    <div v-if="store.result">
  <p><strong>Consumo:</strong> {{ simulation.result.estimatedConsumptionKWh }} kWh</p>
  <p><strong>CO₂:</strong> {{ simulation.result.co2EquivalentKg }} kg</p>
</div>

<div v-else>
  <p>Nessun risultato disponibile.</p>
</div>


    <!-- ✅ CONFRONTO -->
    <div style="border:1px solid #ddd; padding:1rem; border-radius:8px; margin-bottom:1rem;">
      <h3>Confronto con la località</h3>

      <select v-model="selectedLocation">
        <option value="">-- Seleziona località --</option>
        <option v-for="loc in store.locations" :key="loc.id" :value="loc.id">
          {{ loc.name }}
        </option>
      </select>

      <button @click="compare" style="margin-left:0.5rem;">
        Confronta
      </button>

      <div v-if="store.compareResult" style="margin-top:1rem;">
        <p><strong>Consumo medio:</strong> {{ store.compareResult.estimatedConsumptionKWh }} kWh</p>
        <p><strong>CO₂ medio:</strong> {{ store.compareResult.co2EquivalentKg }} kg</p>
      </div>
    </div>

    <!-- ✅ STORICO -->
    <div style="border:1px solid #ddd; padding:1rem; border-radius:8px;">
      <h3>📊 Storico Simulazioni</h3>

      <div v-if="store.history.length === 0">
        Nessuna simulazione ancora.
      </div>

      <ul>
        <li v-for="(item, index) in store.history" :key="index">
          📅 {{ item.date }} — 🔋 {{ item.kwh }} kWh — {{ item.co2 }} kg CO₂

        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useSimulationStore } from '../store/simulationStore';

export default {
  name: 'ResultView',
  setup() {
    const store = useSimulationStore();
    const selectedLocation = ref('');

    async function compare() {
      if (!selectedLocation.value) return;
      await store.compareLocation(selectedLocation.value);
    }

    function goBack() {
      window.location.href = '/';
    }

    return { store, selectedLocation, compare, goBack };
  }
};
</script>


