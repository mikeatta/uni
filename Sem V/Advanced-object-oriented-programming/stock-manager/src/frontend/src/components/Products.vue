<script setup>
import { ref, onMounted, watchEffect } from 'vue';

const products = ref([]);
const selectedItems = ref([]);
const selectAll = ref(false);
const selectedOperation = ref('');
let showOperationsMenu = ref(false);
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

watchEffect(() => {
  showOperationsMenu.value = selectedItems.value.length > 0;
  selectAll.value = selectedItems.value.length === products.value.length;
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

function clearProductForm() {
  newProduct.value = {
    name: '',
    size: '',
    sku: '',
    purchasePrice: 0.00,
    marketPrice: 0.00,
  };
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
      clearProductForm();
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
  clearProductForm();
}
</script>

<template>
  <section class='productsView'>
    <div class='productList'>
      <h1>List of products:</h1>
      <div class='optionsMenu' v-if='showOperationsMenu'>
        <!-- Dropdown menu for selecting operations -->
        <select v-model='selectedOperation'>
          <option value='delete'>Delete</option>
          <option value='modify'>Modify</option>
        </select>

        <!-- Button to trigger the selected operation -->
        <button @click='performOperation'>Submit</button>
      </div>

      <table>
        <thead>
        <tr>
          <th>
            <label>
              <!-- Checkbox for selecting the whole item list -->
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

    <div class='controls'>
      <div class='controlButtons'>
        <button id='add-item-btn'>Add</button>
        <button id='update-item-btn'>Update</button>
        <button id='delete-item-btn'>Remove</button>
      </div>

      <div class='controlForm'>
        <!-- Form for adding new products and editing existing entries -->
        <form @submit.prevent='addProduct'>
          <label>Name: <input v-model='newProduct.name' required/></label><br>
          <label>Size: <input v-model='newProduct.size' required/></label><br>
          <label>SKU: <input v-model='newProduct.sku' required/></label><br>
          <label>Purchase price: <input v-model.number='newProduct.purchasePrice' required/></label><br>
          <label>Market price: <input v-model.number='newProduct.marketPrice' required/></label><br>
          <button id='ctrl-form-btn' type='submit'>Submit</button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.productsView {
  display: flex;
  flex-direction: row;
  gap: 5vw;
}

.productList {
  flex: 3;
}

.controls {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.controlButtons {
  justify-content: space-between;
}

.controlForm input {
  width: 100%;
}
.controlButtons,
.controlForm {
  display: flex;
  flex: 1;
}
</style>