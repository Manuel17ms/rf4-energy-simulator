<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

const props = defineProps({
  history: Array
})

const chartData = {
  labels: props.history.map(h => h.date),
  datasets: [
    {
      label: 'kWh',
      data: props.history.map(h => h.kwh),
      borderColor: '#eaffd8'
    }
  ]
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      ticks: {
        color: '#eaffd8'
      }
    },
    x: {
      ticks: {
        color: '#eaffd8'
      }
    }
  }
}
</script>

<template>
  <Line :data="chartData" :options="chartOptions" />
</template>
