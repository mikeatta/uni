<script setup>
import { ref } from "vue";
import Charts from "@/components/Charts.vue";
import Summary from "@/components/Summary.vue";
import Products from "@/components/Products.vue";

const products = ref([]);

const updateProducts = (updatedProducts) => {
  products.value = updatedProducts;
};
</script>

<template>
  <main>
    <div class='statisticalElements'>
      <Charts :products='products' class='charts' />
      <Summary :products='products' class='summary' />
    </div>
    <Products @updateProductList='updateProducts' />
  </main>
</template>

<style scoped>
.statisticalElements {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 5%;
}

.charts {
  flex: 3;
}

.summary {
  flex: 1;
}
</style>
