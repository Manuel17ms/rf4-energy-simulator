<script setup>
import { useSimulationStore } from '../store/simulationStore';
import { storeToRefs } from 'pinia';

// Prendiamo lo store
const simulation = useSimulationStore();

// Rendiamo reattivi gli stati
const { result, compareResult, history, locations } = storeToRefs(simulation);
</script>

<template>
  <div class="container">

    <h1>RF4 — Simulazione Consumo Energetico</h1>

    <!-- 🔹 RISULTATO SIMULAZIONE -->
    <section v-if="result" class="card">
      <h2>Risultato Simulazione</h2>

      <p><strong>Consumo:</strong> {{ result.estimatedConsumptionKWh }} kWh</p>
      <p><strong>CO₂:</strong> {{ result.co2EquivalentKg }} kg</p>
    </section>

    <section v-else class="card">
      <p>Nessun risultato disponibile.</p>
    </section>

    <!-- 🔹 CONFRONTO LOCALITÀ -->
    <section class="card">
      <h2>Confronto con la località</h2>

      <select v-model="simulation.form.locationId">
        <option disabled value="">Seleziona località</option>
        <option v-for="loc in locations" :key="loc.id" :value="loc.id">
          {{ loc.name }}
        </option>
      </select>

      <button @click="simulation.compareLocation(simulation.form.locationId)">
        Confronta
      </button>

      <div v-if="compareResult">
        <p><strong>Consumo medio:</strong> {{ compareResult.averageKWh }} kWh</p>
        <p><strong>CO₂ media:</strong> {{ compareResult.averageCO2 }} kg</p>
      </div>
    </section>

    <!-- 🔹 STORICO -->
    <section class="card">
      <h2>📊 Storico Simulazioni</h2>

      <ul>
        <li v-for="(item, index) in history" :key="index">
          📅 {{ item.date }} — 🔋 {{ item.kwh }} kWh — 🌱 {{ item.co2 }} kg CO₂
        </li>
      </ul>
    </section>

  </div>
</template>

<style>
.container {
  max-width: 900px;
  margin: auto;
}
.card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  margin-bottom: 20px;
}
</style>
