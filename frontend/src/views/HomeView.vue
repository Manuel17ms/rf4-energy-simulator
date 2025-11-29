<template>
  <div>
    <SimulationForm @submitted="onSubmitted" />
  </div>
</template>

<script>
import SimulationForm from '../components/SimulationForm.vue';
import { useSimulationStore } from '../store/simulationStore';

export default {
  name: 'HomeView',
  components: { SimulationForm },
  setup() {
    const store = useSimulationStore();
    store.loadLocations();
    const onSubmitted = () => {
      // navigate to results after submission
      // store.submitSimulation already called by the form; we move to /result
      // use router push
      window.location.href = '/result';
    };
    return { onSubmitted };
  }
};
</script>
