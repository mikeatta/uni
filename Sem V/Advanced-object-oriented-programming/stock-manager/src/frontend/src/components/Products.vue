<script setup>
import { ref, onMounted, watchEffect, computed } from 'vue';

const emit = defineEmits(['updateProductList']);

const products = ref([]);
const filteredProducts = ref([]);
const selectedItems = ref([]);
const selectAll = ref(false);
const selectedOperation = ref('');
let showControlForm = ref(false);
let showConfirmationDialog = ref(false);
const newProduct = ref({
  name: '',
  size: '',
  sku: '',
  purchasePrice: 0.00,
  marketPrice: 0.00,
  amountMade: 0.00,
});

const searchQuery = ref('');
const sortDirection = ref('off');

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
      amountMade: product.amountMade || 0.00,
    }));

    updateProductList();
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});

const updateProductList = () => {
  if (products.value.length > 0) {
    // Pass the loaded product list outside of Products.vue
    emit('updateProductList', products.value);
    // Fill out filteredProducts to load the items on a refresh
    filteredProducts.value = products.value;
  }
}

function debounce(callback, delay = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  }
}

const delaySearchQueryUpdate = debounce(() => {
  filteredProducts.value = products.value.filter(product =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const toggleSortDirection = () => {
  const sortStates = ['off', 'asc', 'desc'];
  const currentState = sortStates.indexOf(sortDirection.value);
  const nextState = (currentState + 1) % sortStates.length;
  sortDirection.value = sortStates[nextState];
}

const sortedProducts = computed(() => {
  let sortedProducts = [...filteredProducts.value];

  if (sortDirection.value !== 'off') {
    sortedProducts = sortedProducts.sort((a, b) => {
      const fa = a.name.toLowerCase();
      const fb = b.name.toLowerCase();

      return sortDirection.value === 'asc' ? fa.localeCompare(fb) : fb.localeCompare(fa);
    });
  } else {
    sortedProducts = [...filteredProducts.value];
  }

  return sortedProducts;
});

function toggleControlMenu(operation) {
  // Set the selected operation
  selectedOperation.value = operation;

  // Display delete pop-up warning
  if (operation === 'delete') {
    showConfirmationDialog.value = true;
  } else {
    showControlForm.value = !showControlForm.value;
  }
}

function cancelDeleteOperation() {
  showConfirmationDialog.value = false;
  resetOperationHideMenu();
}

function getButtonText() {
  switch (selectedOperation.value) {
    case 'add':
      return 'Add item';
    case 'update':
      return 'Modify item(s)';
    default:
      return 'Submit';
  }
}

function toggleSelectAll() {
  if (selectAll.value) {
    selectedItems.value = [...filteredProducts.value];
  } else {
    selectedItems.value = [];
  }
}

function resetSelectedProducts() {
  if (selectedItems.value) {
    selectedItems.value = [];
  }
}

function resetOperationHideMenu() {
  if (selectedOperation.value === 'delete') {
    showConfirmationDialog.value = false;
  } else {
    showControlForm.value = false;
  }
  selectedOperation.value = '';
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
  switch (selectedOperation.value) {
    case 'add':
      await addProduct();
      break;
    case 'update':
      await modifyProduct();
      break;
    case 'delete':
      await deleteProduct();
      break;
  }

  clearProductForm();
  updateProductList();
  resetSelectedProducts();
  resetOperationHideMenu();
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
      const newProduct = await addResponse.json();

      // Add the new product to the list
      products.value = [...products.value, newProduct];
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
        const newProduct = await modifyResponse.json();

        // Set new values to selected items
        const index = products.value.findIndex(product => product.id === selectedItem.id);
        if (index !== -1) {
          products.value[index] = newProduct;
        }
      } else {
        console.log(`Error modifying item with ID ${selectedItem.id}`);
      }
    } catch (error) {
      console.log('Error modifying items:', error);
    }
  }
}

watchEffect(() => {
  if (searchQuery.value) {
    selectAll.value = selectedItems.value.length === filteredProducts.value.length;
  } else {
    selectAll.value = selectedItems.value.length === products.value.length;
  }
});
</script>

<template>
  <section class='productsView'>
    <div class='productList'>
      <h1>List of products:</h1>

      <!-- Product search box -->
      <div class='searchBox'>
        <label for='search'>Search:</label>
        <input type='text' id='search' v-model='searchQuery'
               @input='delaySearchQueryUpdate'/>
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
          <th>
            <span @click='toggleSortDirection'>Name</span>
            <span v-if='sortDirection.valueOf() === "asc"'> ▲</span>
            <span v-else-if='sortDirection.valueOf() === "desc"'> ▼</span>
          </th>
          <th>Size</th>
          <th>SKU</th>
          <th>Purchase price</th>
          <th>Market price</th>
          <th>Amount made</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='product in sortedProducts' :key='product.id'>
          <td>
            <!-- Checkbox for each item -->
            <input type='checkbox' v-model='selectedItems' :value='product'/>
          </td>
          <td>{{ product.name }}</td>
          <td>{{ product.size }}</td>
          <td>{{ product.sku }}</td>
          <td>{{ product.purchasePrice.toFixed(2) }}</td>
          <td>{{ product.marketPrice.toFixed(2) }}</td>
          <td>{{ product.amountMade.toFixed(2) }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class='controls'>
      <div class='controlButtons'>
        <button id='add-item-btn' @click="() => toggleControlMenu('add')">Add</button>
        <button id='update-item-btn' @click="() => toggleControlMenu('update')">Update</button>
        <button id='delete-item-btn' @click="() => toggleControlMenu('delete')">Delete</button>
      </div>

      <div class='controlForm' v-if='showControlForm'>
        <!-- Form for adding new products and editing existing entries -->
        <form @submit.prevent='performOperation'>
          <label>Name: <input v-model='newProduct.name' required/></label><br>
          <label>Size: <input v-model='newProduct.size' required/></label><br>
          <label>SKU: <input v-model='newProduct.sku' required/></label><br>
          <label>Purchase price: <input v-model.number='newProduct.purchasePrice' required/></label><br>
          <label>Market price: <input v-model.number='newProduct.marketPrice' required/></label><br>
          <button id='ctrl-form-btn' type='submit'>{{ getButtonText() }}</button>
        </form>
      </div>
      <div class='confirmationDialog' v-if='showConfirmationDialog'>
        <p>Are you sure you want to delete {{ selectedItems.length }} items?</p>
        <button @click='performOperation'>Confirm</button>
        <button @click='cancelDeleteOperation'>Cancel</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.productsView {
  display: flex;
  flex-direction: row;
  gap: 5%;
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
  display: flex;
  flex: 0;
  justify-content: space-between;
}

.controlForm {
  display: flex;
  flex: 1;
}

.controlForm input {
  width: 100%;
}
</style>