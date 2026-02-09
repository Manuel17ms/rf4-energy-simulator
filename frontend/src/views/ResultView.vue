
<script setup>
import { useSimulationStore } from '../store/simulationStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import SimulationChart from '../components/SimulationChart.vue';
import HistoryChart from '../components/HistoryChart.vue';

const router = useRouter();
const simulation = useSimulationStore();

const { result, compareResult, history, locations } = storeToRefs(simulation);

const goBack = () => router.push('/');
</script>

<template>
  <div class="page">

    <div class="logo">TnEnergy</div>
    <div class="back" @click="goBack">←</div>

    <div class="dashboard">

      <!-- LEFT SIDE (DATI) -->
      <div class="left">

        <h1>Simulation Result</h1>

        <!-- RESULT -->
        <div class="box" v-if="result">
          <p><strong>Consumption:</strong> {{ result.estimatedConsumptionKWh }} kWh</p>
          <p><strong>CO₂:</strong> {{ result.co2EquivalentKg }} kg</p>
        </div>

        <!-- COMPARE -->
        <div class="box">

          <label>Neighborhood</label>

          <select v-model="simulation.form.locationId">
            <option disabled value="">-- Select --</option>
            <option
              v-for="loc in locations"
              :key="loc.id"
              :value="loc.id"
            >
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
        <div class="box">
          <h3>Simulation history</h3>

          <ul>
            <li v-for="(item,index) in history" :key="index">
              📅 {{ item.date }} — 🔋 {{ item.kwh }} kWh — 🌱 {{ item.co2 }} kg CO₂
            </li>
          </ul>
        </div>

      </div>


      <!-- RIGHT SIDE (GRAFICI) -->
      <div class="right">

        <div v-if="compareResult && result" class="chartCard">
          <SimulationChart
            :userValue="result.estimatedConsumptionKWh"
            :compareValue="compareResult.estimatedConsumptionKWh"
          />
        </div>

        <div v-if="history.length >= 1" class="chartCard">
          <HistoryChart :history="history" />
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>

.page {
  min-height: 100vh;
  background: #2f6f2f;
  padding: 40px;
  font-family: Arial, sans-serif;
  position: relative;
}

/* DASHBOARD GRID */
.dashboard {
  display: grid;
  grid-template-columns: 460px 1fr;
  gap: 40px;
  max-width: 1400px;
  margin: auto;
}

/* LEFT PANEL */
.left {
  color: #f4fff4;
}

/* RIGHT PANEL */
.right {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* BOX DATI */
.box {
  background: rgba(255,255,255,0.06);
  border-radius: 12px;
  padding: 22px;
  margin-bottom: 24px;
}

/* CHART CARD */
.chartCard {
  background: rgba(255,255,255,0.08);
  padding: 24px;
  border-radius: 14px;
}

/* SELECT */
select {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: none;
  background: #e7f6e7;
  margin-top: 6px;
  margin-bottom: 12px;
}

/* BUTTON */
.secondary {
  width: 100%;
  padding: 12px;
  background: #e7f6e7;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  color: #2f6f2f;
}

/* LOGO */
.logo {
  position: absolute;
  top: 20px;
  left: 20px;
  background: #e7f6e7;
  padding: 20px;
  border-radius: 50%;
  font-weight: bold;
  color: #2f6f2f;
}

/* BACK */
.back {
  position: absolute;
  top: 30px;
  right: 30px;
  font-size: 32px;
  color: #e7f6e7;
  cursor: pointer;
}

ul {
  padding-left: 20px;
}

</style>







