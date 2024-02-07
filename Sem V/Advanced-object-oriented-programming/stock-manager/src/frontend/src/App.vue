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
    <Charts :products='products' />
    <Summary :products='products' />
    <Products @updateProductList='updateProducts' />
  </main>
</template>

<style scoped>

</style>
