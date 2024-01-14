<script setup>
import { ref, onMounted } from 'vue';

const products = ref([]);
const selectedItems = ref([]);
const selectAll = ref(false);
const selectedOperation = ref('');
const newProduct = ref({
  name: '',
  size: '',
  sku: '',
  purchasePrice: 0.00,
  marketPrice: 0.00,
});

onMounted(async () => {
  try {
    const response = await fetch('/api/v1/products');
    const data = await response.json();
    products.value = data.map(product => ({
      id: product.id,
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

function toggleSelectAll() {
  if (selectAll.value) {
    selectedItems.value = [...products.value];
  } else {
    selectedItems.value = [];
  }
}

function resetDropdownSelection() {
  selectedItems.value = [];
}

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
      products.value = [...products.value, newProduct.value];

      // Clear the form
      newProduct.value = {
        name: '',
        size: '',
        sku: '',
        purchasePrice: 0.00,
        marketPrice: 0.00,
      };
    } else {
      console.error('Error adding product:', addResponse.status, addResponse.statusText);
    }
  } catch (error) {
    console.log('Error adding product:', error);
  }
}

async function deleteProduct() {
  for (const selectedItem of selectedItems.value) {
    try {
      const deleteResponse = await fetch(`/api/v1/products/${selectedItem.id}`, {
        method: 'DELETE'
      });

      if (deleteResponse.ok) {
        // Remove the deleted item from the products list
        products.value = products.value.filter(product => product.id !== selectedItem.id);
      } else {
        console.log(`Error deleting item with ID ${selectedItem.id}`);
      }
    } catch (error) {
      console.log('Error deleting items:', error);
    }
  }
}

async function modifyProduct() {
  for (const selectedItem of selectedItems.value) {
    try {
      const modifyResponse = await fetch(`/api/v1/products/${selectedItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct.value)
      });

      if (modifyResponse.ok) {
        // Set new values to selected items
        const index = products.value.findIndex(product => product.id === selectedItem.id);
        if (index !== -1) {
          products.value[index] = newProduct.value;
        }
      } else {
        console.log(`Error modifying item with ID ${selectedItem.id}`);
      }
    } catch (error) {
      console.log('Error modifying items:', error);
    }
  }
}

async function performOperation() {
  if (selectedOperation.value === 'delete') {
    await deleteProduct();
  } else if (selectedOperation.value === 'modify') {
    await modifyProduct();
  }

  // Reset operation selection
  resetDropdownSelection();
}
</script>

<template>
  <div>
    <h1>List of products:</h1>

    <!-- Dropdown menu for selecting operations -->
    <select v-model='selectedOperation'>
      <option value='delete'>Delete</option>
      <option value='modify'>Modify</option>
    </select>

    <!-- Button to trigger the selected operation -->
    <button @click='performOperation'>Submit</button>

    <!-- Form for adding new products -->
    <form @submit.prevent='addProduct'>
      <label>Name: <input v-model='newProduct.name' required/></label><br>
      <label>Size: <input v-model='newProduct.size' required/></label><br>
      <label>SKU: <input v-model='newProduct.sku' required/></label><br>
      <label>Purchase price: <input v-model.number='newProduct.purchasePrice' required/></label><br>
      <label>Market price: <input v-model.number='newProduct.marketPrice' required/></label><br>
      <button type='submit'>Add Product</button>
    </form>

    <table>
      <thead>
      <tr>
        <th>
          <!-- Checkbox for selecting individual items -->
          <label>
            <input type='checkbox' v-model='selectAll' @change='toggleSelectAll'>
            Select all
          </label>
        </th>
        <th>Name</th>
        <th>Size</th>
        <th>SKU</th>
        <th>Purchase price</th>
        <th>Market price</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for='product in products' :key='product.id'>
        <td>
          <!-- Checkbox for each item -->
          <input type='checkbox' v-model='selectedItems' :value='product'/>
        </td>
        <td>{{ product.name }}</td>
        <td>{{ product.size }}</td>
        <td>{{ product.sku }}</td>
        <td>{{ product.purchasePrice.toFixed(2) }}</td>
        <td>{{ product.marketPrice.toFixed(2) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>