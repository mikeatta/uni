<script setup>
import {onMounted, ref, watch} from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps(['products']);
const chartUpdated = ref(false);
let productChart;

const data = {
  type: 'doughnut',
  data: {
    labels: props.products.map(product => product.name),
    datasets: [
      {
        label: 'Value',
        data: props.products.map(product => product.marketPrice),
        backgroundColor: "rgba(54,73,93,.5)",
        borderColor: "#36495d",
        borderWidth: 3
      }
    ]
  },
  options: {
    responsive: false,
    legend: {
      display: false
    }
  }
};

function generateChart() {
  if (productChart) {
    productChart.destroy();
    console.log('Destroyed old chart');
  }

  document.querySelector(".chartContainer").innerHTML =
      '<canvas id="categoryValueChart" v-if="chartUpdated"></canvas>';

  const ctx = document.getElementById('categoryValueChart');
  productChart = new Chart(ctx, data);
  productChart.render();
  console.log('Chart generated');
}

function updateChart() {
  chartUpdated.value = true;

  if (productChart) {
    productChart.destroy();
    console.log('Destroyed old chart');
  }

  document.querySelector(".chartContainer").innerHTML =
      '<canvas id="categoryValueChart" v-if="chartUpdated"></canvas>';

  productChart.data.labels = props.products.map(product => product.name);
  productChart.data.datasets.data = props.products.map(product => product.marketPrice);
  generateChart();
  productChart.render();
}

onMounted(() => {
  generateChart();
})

watch(() => props.products, (newProducts, oldProducts) => {
  updateChart();
  console.log('Products updated:', newProducts);
}, {deep: true});
</script>

<template>
  <div class='chartContainer'></div>
</template>

<style scoped>

</style>