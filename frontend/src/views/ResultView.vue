
<script setup>
import { useSimulationStore } from '../store/simulationStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
const simulation = useSimulationStore();

const { result, compareResult, history, locations } = storeToRefs(simulation);

const goBack = () => {
  router.push('/');
};
</script>

<template>
  <div class="page">

    <!-- LOGO -->
    <div class="logo">TnEnergy</div>

    <!-- BACK -->
    <div class="back" @click="goBack">←</div>

    <!-- CARD -->
    <div class="card">

      <h1>Simulation Result</h1>

      <!-- RESULT -->
      <div v-if="result" class="section">
        <p><strong>Consumption:</strong> {{ result.estimatedConsumptionKWh }} kWh</p>
        <p><strong>CO₂:</strong> {{ result.co2EquivalentKg }} kg</p>
      </div>

      <!-- COMPARE -->
      <div class="section">

        <label>Neighborhood</label>

        <select v-model="simulation.form.locationId">
          <option disabled value="">-- Select --</option>
          <option v-for="loc in locations" :key="loc.id" :value="loc.id">
            {{ loc.name }}
          </option>
        </select>

        <button
          class="secondary"
          @click="simulation.compareLocation(simulation.form.locationId)"
        >
          Compare
        </button>

        <div v-if="compareResult" class="compareBox">
          <p><strong>Average consumption:</strong> {{ compareResult.estimatedConsumptionKWh }} kWh</p>
          <p><strong>Average CO₂:</strong> {{ compareResult.co2EquivalentKg }} kg</p>
        </div>

      </div>

      <!-- HISTORY -->
      <div class="section">
        <h3>Simulation history</h3>

        <ul>
          <li v-for="(item, index) in history" :key="index">
            📅 {{ item.date }} — 🔋 {{ item.kwh }} kWh — 🌱 {{ item.co2 }} kg CO₂
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #3a9d23;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
  position: relative;
}

/* LOGO */
.logo {
  position: absolute;
  top: 20px;
  left: 20px;
  background: #eaffd8;
  padding: 20px;
  border-radius: 50%;
  font-weight: bold;
  color: #2f7c1d;
}

/* BACK */
.back {
  position: absolute;
  top: 30px;
  right: 30px;
  font-size: 32px;
  color: #eaffd8;
  cursor: pointer;
}

/* CARD */
.card {
  width: 420px;
  color: #eaffd8;
}

/* SECTIONS */
.section {
  margin-top: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

/* INPUT */
select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: none;
  background: #eaffd8;
  margin-bottom: 10px;
}

/* BUTTON */
.secondary {
  width: 100%;
  padding: 10px;
  background: #eaffd8;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  color: #2f7c1d;
}

.compareBox {
  margin-top: 15px;
  padding: 10px;
  border: 1px solid #eaffd8;
  border-radius: 6px;
}

ul {
  padding-left: 20px;
}
</style>


