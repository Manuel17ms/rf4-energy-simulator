<template>
  <form @submit.prevent="onSubmit" style="border:1px solid #ddd; padding:1rem; border-radius:8px;">
    <div style="display:grid; gap:0.75rem;">
      <label>
        Metratura (m²)
        <input type="number" v-model.number="store.form.squareMeters" min="10" required />
      </label>

      <label>
        Tipologia abitazione
        <select v-model="store.form.housingType">
          <option value="apartment">Appartamento</option>
          <option value="house">Casa</option>
        </select>
      </label>

      <label>
        Numero residenti
        <input type="number" v-model.number="store.form.residents" min="1" required />
      </label>

      <div>
        <label>Energia per acqua</label>
        <select v-model="store.form.energy.water">
          <option value="gas">Gas</option>
          <option value="electricity">Elettricità</option>
        </select>
      </div>

      <div>
        <label>Riscaldamento</label>
        <select v-model="store.form.energy.heating">
          <option value="gas">Gas</option>
          <option value="electricity">Elettricità</option>
        </select>
      </div>

      <div>
        <label>Cucina</label>
        <select v-model="store.form.energy.cooking">
          <option value="gas">Gas</option>
          <option value="electricity">Elettricità</option>
        </select>
      </div>

      <div>
        <label>Località</label>
        <select v-model="store.form.locationId" required>
          <option value="">-- Seleziona --</option>
          <option v-for="loc in store.locations" :key="loc.id" :value="loc.id">{{ loc.name }}</option>
        </select>
      </div>

      <div>
        <button type="submit" :disabled="store.loading">
          {{ store.loading ? 'Calcolo...' : 'Calcola simulazione' }}
        </button>
      </div>

      <div v-if="store.error" style="color: red;">{{ store.error }}</div>
    </div>
  </form>
</template>

<script>
import { useSimulationStore } from '../store/simulationStore';
import { useRouter } from 'vue-router';

export default {
  name: 'SimulationForm',
  setup() {
    const store = useSimulationStore();
    const router = useRouter();

    async function onSubmit() {
      console.log('🔥 SUBMIT PREMUTO');

      await store.submitSimulation();

      console.log('✅ RISULTATO:', store.result);

      if (store.result) {
        router.push('/result'); // ✅ NO reload, NO reset store
      }
    }

    return { store, onSubmit };
  }
};
</script>



