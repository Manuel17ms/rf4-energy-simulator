<template>
  <div v-if="data" style="border:1px solid #ccc; padding:1rem; border-radius:8px;">
    <h2>Risultato simulazione</h2>

    <p><strong>Consumo stimato (kWh):</strong> {{ data.estimatedConsumptionKWh }}</p>
    <p><strong>Consumo gas (Smc):</strong> {{ data.estimatedGasSmc }}</p>
    <p><strong>Spesa annua (€):</strong> {{ data.estimatedAnnualCost }}</p>

    <h3>Dettaglio:</h3>
    <pre>{{ data }}</pre>
  </div>

  <div v-else>
    <p>Nessun risultato disponibile.</p>
  </div>
</template>

<script>
export default {
  name: 'SimulationResult',
  props: {
    data: {
      type: Object,
      required: false,
      default: null
    }
  }
};
</script>


