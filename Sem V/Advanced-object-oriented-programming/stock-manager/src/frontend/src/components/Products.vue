<script setup>
import { ref, onMounted } from "vue";

const product = ref('');

onMounted(async () => {
  const response = await fetch('/api/v1/products');
  product.value = await response.text();
})
</script>

<template>
  <h1>List of products:</h1>
  <p>{{ product }}</p>
</template>

<style scoped>

</style>