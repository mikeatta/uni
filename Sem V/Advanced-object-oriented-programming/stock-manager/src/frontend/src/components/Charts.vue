<script setup>
import { onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps(['products']);
let productChart;

function generateChart() {
  const data = {
    type: 'doughnut',
    data: {
      labels: props.products.map(product => product.name),
      datasets: [{
        label: 'Value',
        data: props.products.map(product => product.marketPrice),
        backgroundColor: "rgba(54,73,93,.5)",
        borderColor: "#36495d",
        borderWidth: 3
      }]
    },
    options: {
      responsive: false,
      plugins: {
        legend: {
          display: true
        }
      }
    }
  };

  const ctx = document.getElementById('categoryValueChart');
  productChart = new Chart(ctx, data);
}

function updateChart() {
  productChart.data.labels = props.products.map(product => product.name);
  productChart.data.datasets[0].data = props.products.map(product => product.marketPrice);
  productChart.update();
}

onMounted(() => {
  generateChart();
});

watch(() => props.products, (newProducts, oldProducts) => {
  updateChart();
}, {deep: true});
</script>

<template>
  <div>
    <canvas id="categoryValueChart" width="320" height="320"></canvas>
  </div>
</template>

<style scoped>

</style>