<script setup>
import { useCartStore } from "@/stores/cart";

defineProps({
  prod: {
    type: Object,
    required: true,
  },
});

const cartStore = useCartStore();
</script>

<template>
  <div>
    <p class="prod-quant">Quantity:</p>
    <button @click="cartStore.decreaseProdQuant(prod)">-</button>
    <input type="number" :value="prod.quantity" readonly min="1" max="5" />
    <button @click="cartStore.incrementProdQuant(prod)">+</button>
    <br />
    <button @click="cartStore.removeFromCart(prod)" class="remove-btn">
      Remove from cart
    </button>
  </div>
</template>

<style scoped>
.prod-quant {
  margin-bottom: 10px;
}

.remove-btn {
  background-color: red;
  margin-top: 10px !important;
  border-radius: 5px;
  border: 0;
  color: white;
  margin: 0 auto;
  padding: 6px 1.3rem;
  font-weight: bold;
  cursor: pointer;
}
</style>
