<script setup>
import ProdQuant from "./ProdQuant.vue";

defineProps({
  prod: {
    type: Object,
    required: true,
  },
  cartView: {
    type: Boolean,
    default: false,
  },
});

</script>

<template>
  <div class="prod-card">
    <div class="img-container">
      <img :src="prod.image" alt="prod-img" />
    </div>

    <h3>{{ prod.title }}</h3>

    <p class="prod-cat">{{ prod.category }}</p>

    <h3 class="prod-price">R{{ prod.price }}</h3>

    <ProdQuant v-if="cartView" :prod="prod" />

    <RouterLink
      v-if="!cartView"
      class="see-prod-btn"
      :to="{ name: 'product-details', params: { id: prod.id } }"
    >
      Open
    </RouterLink>
  </div>
</template>

<style scoped>
.prod-card {
  min-width: 250px;
  max-width: 250px;
  text-align: center;
  padding-bottom: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  overflow: hidden;
}

.img-container {
  background-color: white;
  height: 200px;
  position: relative;
  margin-bottom: 10px;
}

.prod-card img {
  max-width: 200px;
  max-height: 200px;

  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: 0;
  right: 0;
}

h3 {
  font-weight: bold;
  margin-bottom: 10px;
}

.prod-cat {
  margin-bottom: 10px;
}

.prod-price {
  color: hsla(160, 100%, 37%, 1);
  font-weight: bold;
}

.see-prod-btn {
  color: white;
  margin: 0 auto;
  padding: 6px 1.3rem;
  font-weight: bold;
  background-color: hsla(160, 100%, 37%, 1);
  width: 90%;
  cursor: pointer;
}
</style>
