<template>
  <div style="margin-top:2rem; border-top:1px solid #ccc; padding-top:1rem;">
    <h3>Confronto con la località</h3>

    <button @click="compare" :disabled="!store.form.locationId">
      Confronta con questa località
    </button>

    <p v-if="store.compareResult">
  Consumo medio: {{ store.compareResult.estimatedConsumptionKWh }} kWh
  <br>
  CO₂ media: {{ store.compareResult.co2EquivalentKg }} kg
</p>


</template>

<script>
import { useSimulationStore } from '../store/simulationStore';

export default {
  name: 'LocationCompare',
  setup() {
    const store = useSimulationStore();

    function compare() {
      store.compareLocation(store.form.locationId);
    }

    return { store, compare };
  }
};
</script>

