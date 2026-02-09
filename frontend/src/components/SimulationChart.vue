<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip
} from 'chart.js'
import { ref, watch } from 'vue'

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip)

const props = defineProps({
  userValue: Number,
  compareValue: Number
})

const chartData = ref({
  labels: ['Your home', 'Neighborhood average'],
  datasets: [
    {
      data: [props.userValue, props.compareValue]
    }
  ]
})

watch(
  () => [props.userValue, props.compareValue],
  ([newUser, newCompare]) => {
    chartData.value.datasets[0].data = [newUser, newCompare]
  }
)

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false }
  }
}
</script>

<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>


