
<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

const props = defineProps({
  userValue: Number,
  compareValue: Number
})

/* ======================
   DATA REATTIVO
====================== */

const chartData = computed(() => ({
  labels: ['Your home', 'Neighborhood average'],

  datasets: [
    {
      data: [
        props.userValue ?? 0,
        props.compareValue ?? 0
      ],

      backgroundColor: [
        '#e7f6e7',
        '#cde9cd'
      ],

      borderRadius: 6
    }
  ]
}))

/* ======================
   OPTIONS
====================== */

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: { display: false }
  },

  scales: {
    y: {
      ticks: {
        color: '#eaffd8'
      },
      grid: {
        color: 'rgba(255,255,255,0.1)'
      }
    },

    x: {
      ticks: {
        color: '#eaffd8'
      },
      grid: {
        display: false
      }
    }
  }
}
</script>

<template>
  <div style="height:300px">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

