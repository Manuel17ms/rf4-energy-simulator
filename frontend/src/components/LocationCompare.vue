<template>
  <div>
    <h3>Confronto con altra località</h3>

    <select v-model="selected">
      <option disabled value="">Seleziona località</option>
      <option v-for="loc in locations" :key="loc.id" :value="loc.id">
        {{ loc.name }}
      </option>
    </select>

    <button @click="compare">Confronta</button>

    <div v-if="compareResult">
      <p><strong>Consumo stimato:</strong> {{ compareResult.estimatedConsumptionKWh }} kWh</p>
      <p><strong>CO2 stimata:</strong> {{ compareResult.co2EquivalentKg }} kg</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useSimulationStore } from '../store/simulationStore';

export default {
  setup() {
    const store = useSimulationStore();
    const selected = ref('');

    function compare() {
      if (selected.value) {
        store.compareLocation(selected.value);
      }
    }

    return {
      selected,
      compare,
      locations: store.locations,
      compareResult: store.compareResult
    };
  }
};
</script>
