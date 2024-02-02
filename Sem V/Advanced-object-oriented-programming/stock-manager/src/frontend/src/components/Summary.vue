<script setup>
import { computed } from 'vue';

const props = defineProps(['products']);

// Computed property to calculate totalProductsValue
const totalProductsValue = computed(() => {
    return props.products.reduce((sum, product) => sum + product.marketPrice, 0);
});
</script>

<template>
  <section class='summary'>
    <div class='summaryContainer'>
      <div id='totalProductCount' class='summaryItem'>
        <h3>Total Products</h3>
        <p># {{ props.products.length }} items</p>
      </div>
      <div id='totalProductValue' class='summaryItem'>
        <h3>Total Value</h3>
        <p>$ {{ totalProductsValue.toFixed(2) }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.summary {
  width: 100%;
}

.summaryContainer {
  display: flex;
  flex-direction: row;
  width: 90%;
}
</style>