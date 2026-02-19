<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
)

const props = defineProps({
  history: {
    type: Array,
    required: true
  }
})



const chartData = computed(() => ({
  labels: props.history.map(h => h.date),

  datasets: [
    {
      data: props.history.map(h => h.kwh),

      borderColor: '#eaffd8',
      backgroundColor: 'rgba(234,255,216,0.25)',

      tension: 0.3,
      pointRadius: 5,
      pointBackgroundColor: '#eaffd8',

      fill: true
    }
  ]
}))



const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false
    }
  },

  scales: {
    y: {
      ticks: { color: '#eaffd8' },
      grid: { color: 'rgba(255,255,255,0.1)' }
    },

    x: {
      ticks: { color: '#eaffd8' },
      grid: { display: false }
    }
  }
}
</script>

<template>
  <div style="height:300px">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
