<script setup>
import { ref, onMounted } from 'vue';

const products = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('/api/v1/products');
    const data = await response.json();
    products.value = data.map(product => ({
      name: product.name || '',
      size: product.size || '',
      sku: product.sku || '',
      purchasePrice: product.purchasePrice || 0,
      marketPrice: product.marketPrice || 0,
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});
</script>

<template>
  <div>
    <h1>List of products:</h1>
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Size</th>
        <th>SKU</th>
        <th>Purchase price</th>
        <th>Market price</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for='product in products' :key='product.id'>
        <td>{{ product.name }}</td>
        <td>{{ product.size }}</td>
        <td>{{ product.sku }}</td>
        <td>{{ product.purchasePrice }}</td>
        <td>{{ product.marketPrice }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>