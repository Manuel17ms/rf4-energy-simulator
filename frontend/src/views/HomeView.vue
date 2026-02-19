<script setup>
import { onMounted } from 'vue'
import { useSimulationStore } from '../store/simulationStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const simulation = useSimulationStore()

onMounted(() => {
  simulation.loadLocations()
})

const submit = async () => {
  await simulation.submitSimulation()
  router.push('/result')
}
  
const goBackToLanding = () => router.push('/')  
  
</script>

<template>
  <div class="page">

    <div class="logo">TnEnergy</div>
    <div class="back" @click="goBackToLanding">←</div>
    <div class="card">

      <h1>Simulator</h1>

    <form @submit.prevent="submit">

  <label>Square footage (m²)</label>
  <input type="number" v-model="simulation.form.squareMeters" />

  <label>Type of dwelling</label>
  <select v-model="simulation.form.housingType">
    <option value="apartment">Apartment</option>
    <option value="house">House</option>
  </select>

  <label>Number of residents</label>
  <input type="number" v-model="simulation.form.residents" />

  <label>Energy for water</label>
  <select v-model="simulation.form.energy.water">
    <option value="electricity">Electricity</option>
    <option value="gas">Gas</option>
  </select>

  <label>Heating</label>
  <select v-model="simulation.form.energy.heating">
    <option value="electricity">Electricity</option>
    <option value="gas">Gas</option>
  </select>

  <label>Kitchen</label>
  <select v-model="simulation.form.energy.cooking">
    <option value="electricity">Electricity</option>
    <option value="gas">Gas</option>
  </select>

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

  <button type="submit" class="submit">
    Calculate simulation
  </button>

</form>


    </div>
  </div>
</template>


<style scoped>
.page {
  min-height: 100vh;
  background: #2f6f2f;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
  position: relative;
}


.logo {
  position: absolute;
  top: 30px;
  left: 30px;
  background: #e7f6e7;
  padding: 22px;
  border-radius: 50%;
  font-weight: bold;
  color: #2f6f2f;
}


.card {
  width: 520px;
  padding: 35px;
  border-radius: 14px;
  background: #3f8c3f;
  color: #f4fff4;
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
}

.card h1 {
  text-align: center;
  margin-bottom: 25px;
}


form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

label {
  font-size: 14px;
}


input,
select {
  padding: 10px;
  border-radius: 6px;
  border: none;
  background: #e7f6e7;
}

.submit {
  margin-top: 20px;
  padding: 12px;
  border: none;
  border-radius: 6px;
  background: #e7f6e7;
  color: #2f6f2f;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.back {
  position: absolute;
  top: 30px;
  right: 30px;
  font-size: 28px;
  color: #e7f6e7;
  cursor: pointer;
}



</style>


















