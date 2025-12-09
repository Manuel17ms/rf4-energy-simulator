<script setup>
import { useSimulationStore } from '../store/simulationStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
const simulation = useSimulationStore();

// render reactive store properties
const { result, compareResult, history, locations } = storeToRefs(simulation);

// funzione per tornare al form
const goBack = () => {
  router.push('/'); // assicurati che "/" sia il percorso del form
};
</script>

<template>
  <div class="container">

    <!-- 🔙 Pulsante per tornare alla simulazione -->
    <button @click="goBack" class="back-btn">← Nuova simulazione</button>

    <h1>RF4 — Simulazione Consumo Energetico</h1>

    <!-- 🔹 RISULTATO SIMULAZIONE -->
    <section v-if="result" class="card">
      <h2>Risultato Simulazione</h2>

      <p><strong>Consumo:</strong> {{ result.estimatedConsumptionKWh }} kWh</p>
      <p><strong>CO₂:</strong> {{ result.co2EquivalentKg }} kg</p>
    </section>

    <section v-else class="card">
      <p>Nessun risultato — esegui prima una simulazione.</p>
      <button @click="goBack">Vai al form</button>
    </section>

    <!-- 🔹 CONFRONTO LOCALITÀ -->
    <section v-if="result" class="card">
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

    <!-- 🔹 STORICO SIMULAZIONI -->
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

.back-btn {
  background: none;
  border: none;
  color: #0077ff;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 1rem;
}

.back-btn:hover {
  text-decoration: underline;
}
</style>

