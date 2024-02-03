<script setup>
const { products } = defineProps(['products']);
</script>

<template>
  <section class='summary'>
    <div class='summaryContainer'>
      <div id='totalProductCount' class='summaryItem'>
        <h3>Total Products</h3>
        <p># {{ products.length }} items</p>
      </div>
      <div id='totalProductValue' class='summaryItem'>
        <h3>Total Value</h3>
        <p>$ {{ products.reduce((sum, product) => sum + product.marketPrice, 0).toFixed(2) }}</p>
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