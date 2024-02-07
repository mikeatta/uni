<script setup>
import { onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps(['products']);
let categoryCountChart;
let categoryValueChart;

let categories = [];
let counts = [];
let values = [];

function getCategoryStatistics() {
  const categoryCounts = {};
  const categoryValues = {};

  props.products.forEach(product => {
    const category = product.category;
    const marketPrice = product.marketPrice;
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    categoryValues[category] = (categoryValues[category] || 0) + marketPrice;
  });

  categories = Object.keys(categoryCounts);
  counts = categories.map(category => categoryCounts[category]);
  values = categories.map(category => categoryValues[category]);
}

function generateCharts() {
  const categoryCountData = {
    type: 'doughnut',
    data: {
      labels: categories,
      datasets: [{
        label: 'Count',
        data: counts,
        backgroundColor: 'rgba(54, 73, 93, .5)',
        borderColor: '#36495d',
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

  const categoryValueData = {
    type: 'doughnut',
    data: {
      labels: categories,
      datasets: [{
        label: 'Value',
        data: values,
        backgroundColor: 'rgba(54, 73,93, .5)',
        borderColor: '#36495d',
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

  const ctxCount = document.getElementById('categoryCountChart');
  const ctxValue = document.getElementById('categoryValueChart');

  categoryCountChart = new Chart(ctxCount, categoryCountData);
  categoryValueChart = new Chart(ctxValue, categoryValueData);
}

function updateCharts() {
  categoryCountChart.data.labels = categories;
  categoryCountChart.data.datasets[0].data = counts;

  categoryValueChart.data.labels = categories;
  categoryValueChart.data.datasets[0].data = values;

  categoryCountChart.update();
  categoryValueChart.update();
}

onMounted(() => {
  generateCharts();
});

watch(() => props.products, (newProducts, oldProducts) => {
  getCategoryStatistics();
  updateCharts();
}, {deep: true});
</script>

<template>
  <div class='productCharts'>
    <canvas id='categoryCountChart' width='320' height='320'></canvas>
    <canvas id='categoryValueChart' width='320' height='320'></canvas>
  </div>
</template>

<style scoped>
.productCharts {
  display: flex;
}
</style>