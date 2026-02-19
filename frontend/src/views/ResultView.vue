
<script setup>
import { useSimulationStore } from '../store/simulationStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import SimulationChart from '../components/SimulationChart.vue';
import HistoryChart from '../components/HistoryChart.vue';

const router = useRouter();
const simulation = useSimulationStore();

const { result, compareResult, history, locations } = storeToRefs(simulation);

const goBack = () => router.push('/home');
</script>

<template>
  <div class="page">

    <div class="logo">TnEnergy</div>
    <div class="back" @click="goBack">←</div>

    <div class="dashboard">

      
      <div class="left">

        <h1>Simulation Result</h1>

     
        <div class="box" v-if="result">
          <p><strong>Consumption:</strong> {{ result.estimatedConsumptionKWh }} kWh</p>
          <p><strong>CO₂:</strong> {{ result.co2EquivalentKg }} kg</p>
        </div>

       
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

     
        <div class="box">
          <h3>Simulation history</h3>

          <ul>
            <li v-for="(item,index) in history" :key="index">
              📅 {{ item.date }} — 🔋 {{ item.kwh }} kWh — 🌱 {{ item.co2 }} kg CO₂
            </li>
          </ul>
        </div>

      </div>


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

.page{
  min-height: 100vh;
  background:#2f6f2f;
  padding: 24px;
  padding-top: 90px;   
  font-family: Arial, sans-serif;
  position: relative;
}



.dashboard {
  max-width: 1280px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 24px;
  align-items: start;
}


.left {
  color: #f4fff4;
}

.left h1 {
  font-size: 34px;
  margin: 0 0 16px;
}


.right {
  display: flex;
  flex-direction: column;
  gap: 24px;
}


.box {
  background: rgba(255,255,255,0.06);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 18px;
}


.chartCard {
  background: rgba(255,255,255,0.08);
  padding: 16px;
  border-radius: 14px;
  min-height: 260px; 
}


select {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: none;
  background: #e7f6e7;
  margin-top: 6px;
  margin-bottom: 12px;
}


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


.logo {
  position: absolute;
  top: 18px;
  left: 18px;
  background: #e7f6e7;
  padding: 14px 20px;
  border-radius: 40px;
  font-weight: bold;
  color: #2f6f2f;
}


.back {
  position: absolute;
  top: 18px;
  right: 18px;
  font-size: 28px;
  color: #e7f6e7;
  cursor: pointer;
}

ul {
  padding-left: 18px;
  margin: 0;
}


@media (max-width: 1100px) {
  .page {
    padding: 16px;
  }

  .dashboard {
    grid-template-columns: 1fr;
  }

  .logo {
    top: 12px;
    left: 12px;
  }

  .back {
    top: 12px;
    right: 12px;
  }
}

</style>











