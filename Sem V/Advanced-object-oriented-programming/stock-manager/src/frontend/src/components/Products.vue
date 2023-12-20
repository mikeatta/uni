<script setup>
import { ref, onMounted } from 'vue';

const products = ref([]);
const newProduct = ref({
  name: '',
  size: '',
  sku: '',
  purchasePrice: 0,
  marketPrice: 0,
});

onMounted(async () => {
  try {
    const response = await fetch('/api/v1/products');
    const data = await response.json();
    products.value = data.map(product => ({
      name: product.name || '',
      size: product.size || '',
      sku: product.sku || '',
      purchasePrice: product.purchasePrice || 0.00,
      marketPrice: product.marketPrice || 0.00,
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});

async function addProduct() {
  try {
    const addResponse = await fetch('/api/v1/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct.value)
    });

    if (addResponse.ok) {
      // Update the product list
      const addedProduct = await addResponse.json();
      products.value = [...products.value, addedProduct];

      // Clear the form
      newProduct.value = {
        name: '',
        size: '',
        sku: '',
        purchasePrice: 0,
        marketPrice: 0,
      };
    } else {
      console.error('Error adding product:', addResponse.status, addResponse.statusText);
    }
  } catch (error) {
    console.log('Error adding product:', error);
  }
}

</script>

<template>
  <div>
    <h1>List of products:</h1>

    <!-- Form for adding new products -->
    <form @submit.prevent='addProduct'>
      <label>Name: <input v-model='newProduct.name' required /></label><br>
      <label>Size: <input v-model='newProduct.size' required /></label><br>
      <label>SKU: <input v-model='newProduct.sku' required /></label><br>
      <label>Purchase price: <input v-model.number='newProduct.purchasePrice' required /></label><br>
      <label>Market price: <input v-model.number='newProduct.marketPrice' required /></label><br>
      <button type='submit'>Add Product</button>
    </form>

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