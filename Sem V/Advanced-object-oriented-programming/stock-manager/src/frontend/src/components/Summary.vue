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
      <div id='totalProductValue' class='summaryItem'>
        <h3>Total Profit</h3>
        <p>$ {{ products.reduce((sum, product) => sum + product.amountMade, 0).toFixed(2) }}</p>
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
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
}

.summaryItem {
  appearance: none;
  -webkit-appearance: none;
  font-size: 0.8rem;
  padding: 0.6rem;
  border: 0.1rem solid white;
  border-radius: 0.5rem;
  background-color: rgba(18, 18, 18, 0.33);
  color: white;
}

.summaryItem:hover {
  background-color: #494848;
  color: white;
  transition-duration: 300ms;
}
</style>