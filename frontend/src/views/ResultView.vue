<template>
  <div>
    <button @click="goBack" style="margin-bottom:1rem;">← Nuova simulazione</button>
    <SimulationResult :data="store.result" />
    <div v-if="!store.result" style="margin-top:1rem;">
      <p>Nessun risultato — esegui prima una simulazione.</p>
      <button @click="goBack">Vai al form</button>
    </div>
  </div>
</template>

<script>
import SimulationResult from '../components/SimulationResult.vue';
import { useSimulationStore } from '../store/simulationStore';
import { onMounted } from 'vue';

export default {
  name: 'ResultView',
  components: { SimulationResult },
  setup() {
    const store = useSimulationStore();
    onMounted(() => {
      // If no result, attempt to submit automatically (in case user came straight from form)
      if (!store.result && store.form) {
        // do nothing automatic — rely on form submit before redirect
      }
    });
    function goBack() {
      window.location.href = '/';
    }
    return { store, goBack };
  }
};
</script>
