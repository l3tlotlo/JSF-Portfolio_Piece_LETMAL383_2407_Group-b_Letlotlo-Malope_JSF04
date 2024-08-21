<script setup>
import PageTitle from "@/components/PageTitle.vue";
import LoaderSpinner from "@/components/LoaderSpinner.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useCartStore } from "@/stores/cart";
import { useUserStore } from "@/stores/user";
import { reactive } from "vue";

const cartStore = useCartStore();
const userStore = useUserStore();

const state = reactive({ isLoading: false });

function buy() {
  state.isLoading = true;
  let prodList = [];

  cartStore.cart.forEach((prod) => {
    prodList.push({
      productId: prod.id,
      quantity: prod.quantity,
    });
  });

  fetch("https://fakestoreapi.com/carts", {
    method: "POST",
    body: JSON.stringify({
      userId: userStore.userId,
      headers: {
        "Content-Type": "application/json",
      },
      date: Date.now(),
      products: prodList,
    }),
  })
    .then((res) => res.json())
    .then((cartId) => {
      cartStore.setLastCart(cartId);
      alert("Thank you for buying with us!");
      state.isLoading = false;
    });
}
</script>

<template>
  <PageTitle :title="'My cart (' + cartStore.getCartLength + ')'" />

  <div v-if="!state.isLoading">
    <h2 id="empty-cart" v-if="cartStore.getCartLength == 0">
      Your cart is empty :(
    </h2>

    <div v-else class="content">
      <div class="product-list-container">
        <ProductCard
          v-for="prod in cartStore.cart"
          :key="prod.id"
          :prod="prod"
          :cartView="true"
        />
      </div>

      <div class="price-card">
        <h2>Total price</h2>
        <h3 class="price">${{ cartStore.getTotalPrice }}</h3>
        <button v-if="userStore.isLoggedIn" @click="buy">Buy</button>
        <button v-else class="please-login">Please sign in to buy</button>
      </div>
    </div>
  </div>

  <LoaderSpinner v-if="state.isLoading" />
</template>

<style scoped>
#empty-cart {
  text-align: center;
}
.content {
  display: flex;
  flex-direction: column;
}

.product-list-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  order: 2;
}

.price-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  order: 1;
  border: 1px solid var(--color-border);
  width: 100%;
  max-height: 120px;
  text-align: center;
  margin-bottom: 1rem;
  border-radius: 10px;
  overflow: hidden;
  padding-top: 10px;
}

.price {
  color: hsla(160, 100%, 37%, 1);
  font-weight: bold;
}

.price-card button {
  color: white;
  margin: 0 auto;
  padding: 6px 1.3rem;
  font-weight: bold;
  background-color: hsla(160, 100%, 37%, 1);
  width: 100%;
  border: 0;
  height: 50px;
}

.please-login {
  background-color: #ffc107 !important;
}

@media (min-width: 764px) {
  .content {
    display: flex;
    flex-direction: row;
  }

  .product-list-container {
    width: 70%;
    order: 1;
  }

  .price-card {
    order: 2;
    width: 20%;
    padding: 0;
    max-height: 100px;
  }
}
</style>
