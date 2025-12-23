

<script setup>
import { onMounted } from 'vue';
import { useSimulationStore } from '../store/simulationStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const simulation = useSimulationStore();

onMounted(() => {
  simulation.loadLocations();
});

const submit = async () => {
  await simulation.submitSimulation();
  router.push('/result');
};
</script>


<template>
  <div class="page">

    <!-- LOGO -->
    <div class="logo">TnEnergy</div>

    <!-- BACK -->
    <div class="back" @click="router.push('/')">←</div>

    <!-- FORM -->
    <div class="card">
      <h1>Simulator</h1>

      <div class="row">
        <label>Square footage (m²)</label>
        <input type="number" v-model="form.squareMeters" />
      </div>

      <div class="row">
        <label>Type of dwelling</label>
        <select v-model="form.housingType">
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
        </select>
      </div>

      <div class="row">
        <label>Number of residents</label>
        <input type="number" v-model="form.residents" />
      </div>

      <div class="row">
        <label>Energy for water</label>
        <select v-model="form.energy.water">
          <option value="electricity">Electricity</option>
          <option value="gas">Gas</option>
        </select>
      </div>

      <div class="row">
        <label>Heating</label>
        <select v-model="form.energy.heating">
          <option value="electricity">Electricity</option>
          <option value="gas">Gas</option>
        </select>
      </div>

      <div class="row">
        <label>Kitchen</label>
        <select v-model="form.energy.kitchen">
          <option value="electricity">Electricity</option>
          <option value="gas">Gas</option>
        </select>
      </div>

      <div class="row">
        <label>Neighborhood</label>
        <select v-model="simulation.form.locationId">
  <option disabled value="">-- Select --</option>

  <option
    v-for="loc in simulation.locations"
    :key="loc.id"
    :value="loc.id"
  >
    {{ loc.name }}
  </option>
</select>


      <button class="submit" @click="submit">
        Calculate simulation
      </button>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #3a9d23;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, sans-serif;
  position: relative;
}

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

.back {
  position: absolute;
  top: 30px;
  right: 30px;
  font-size: 32px;
  color: #eaffd8;
  cursor: pointer;
}

.card {
  background: transparent;
  width: 420px;
  color: #eaffd8;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

label {
  font-size: 14px;
}

input,
select {
  width: 160px;
  padding: 6px;
  border-radius: 4px;
  border: none;
  background: #eaffd8;
}

.submit {
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  background: #eaffd8;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  color: #2f7c1d;
}
</style>



