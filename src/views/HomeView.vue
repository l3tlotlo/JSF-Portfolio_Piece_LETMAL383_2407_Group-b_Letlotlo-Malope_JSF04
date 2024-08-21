<script setup>
import PageTitle from "@/components/PageTitle.vue";
import ProductCard from "@/components/ProductCard.vue";
import LoaderSpinner from "@/components/LoaderSpinner.vue";
import { ref, onMounted, computed } from "vue";

const catList = ref([]);
const prodList = ref([]);
const loadingProd = ref(false);
const loadingCat = ref(false);
const selectedCategory = ref("all");
const sortOption = ref("default");
const theme = ref("light"); // State to manage the theme

const filteredProds = computed(() => {
  let filtered = prodList.value;

  // Filter by category
  if (selectedCategory.value !== "all") {
    filtered = filtered.filter(
      (prod) => prod.category === selectedCategory.value
    );
  }

  // Sort by price
  if (sortOption.value === "low-to-high") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOption.value === "high-to-low") {
    filtered.sort((a, b) => b.price - a.price);
  }

  return filtered;
});

async function getCategories() {
  loadingCat.value = true;
  await fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((list) => (catList.value = list))
    .finally(() => (loadingCat.value = false));
}

async function getAllProds() {
  loadingProd.value = true;
  await fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((list) => (prodList.value = list))
    .finally(() => (loadingProd.value = false));
}

function resetFilters() {
  selectedCategory.value = "all";
  sortOption.value = "default";
}

// Toggle the theme
function toggleTheme() {
  theme.value = theme.value === "light" ? "dark" : "light";
  document.documentElement.className = theme.value; // Apply theme class to the root element
}

onMounted(async () => {
  await getCategories();
  await getAllProds();

  // Apply the initial theme
  document.documentElement.className = theme.value;
});
</script>

<template>
  <PageTitle title="Home" />

  <div class="filters">
    <!-- Category Filter -->
    <select v-model="selectedCategory">
      <option value="all">All Categories</option>
      <option v-for="cat in catList" :key="cat" :value="cat">
        {{ cat }}
      </option>
    </select>

    <!-- Price Sort -->
    <select v-model="sortOption">
      <option value="default">Sort by: Default</option>
      <option value="low-to-high">Price: Low to High</option>
      <option value="high-to-low">Price: High to Low</option>
    </select>

    <!-- Reset Filters Button -->
    <button @click="resetFilters" class="reset-filters-btn">
      Reset Filters
    </button>

    <!-- Theme Toggle Button -->
    <button @click="toggleTheme" class="theme-toggle-btn">
      Switch to {{ theme === 'light' ? 'Dark' : 'Light' }} Mode
    </button>
  </div>

  <div class="content">
    <div class="product-list-container">
      <LoaderSpinner v-if="loadingProd" />
      <ProductCard v-for="prod in filteredProds" :key="prod.id" :prod="prod" />
    </div>
  </div>
</template>

<style scoped>
:root {
  --color-background: #ffffff;
  --color-text: #000000;
  --color-border: #dddddd;
}

.dark {
  --color-background: #121212;
  --color-text: #ffffff;
  --color-border: #333333;
}

.content {
  display: flex;
  flex-direction: column;
  background-color: var(--color-background);
  color: var(--color-text);
}

.product-list-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  width: 100%;
}

.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.filters select {
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid var(--color-border);
}

.reset-filters-btn,
.theme-toggle-btn {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.reset-filters-btn:hover,
.theme-toggle-btn:hover {
  background-color: #e55342;
}
</style>
