<script setup>
import PageTitle from "@/components/PageTitle.vue";
import LoaderSpinner from "@/components/LoaderSpinner.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useWishlistStore } from "@/stores/wishlist";
import { useCartStore } from "@/stores/cart";
import { useUserStore } from "@/stores/user";
import { computed, reactive } from "vue";

const wishlistStore = useWishlistStore();
const cartStore = useCartStore();
const userStore = useUserStore();

const state = reactive({ isLoading: false });

const wishlistLength = computed(() => wishlistStore.wishlist.length);

function moveToCart(product) {
  if (!userStore.isLoggedIn) {
    alert("Please sign in to add items to the cart.");
    return;
  }

  cartStore.addToCart(product);
  wishlistStore.removeFromWishlist(product.id);

  alert("Product moved to cart!");
}

function clearWishlist() {
  wishlistStore.clearWishlist();
  alert("Wishlist cleared!");
}
</script>

<template>
  <PageTitle :title="'My Wishlist (' + wishlistLength + ')'" />

  <div v-if="!state.isLoading">
    <h2 id="empty-wishlist" v-if="wishlistLength === 0">
      Your wishlist is empty :(
    </h2>

    <div v-else class="content">
      <div class="wishlist-actions">
        <button @click="clearWishlist" class="clear-wishlist-btn">
          Clear Wishlist
        </button>
      </div>

      <div class="product-list-container">
        <ProductCard
          v-for="prod in wishlistStore.wishlistItems"
          :key="prod.id"
          :prod="prod"
          :showDetails="true"  
        >
          <template #actions>
            <button @click="moveToCart(prod)">Move to Cart</button>
          </template>
        </ProductCard>
      </div>
    </div>
  </div>

  <LoaderSpinner v-if="state.isLoading" />
</template>

<style scoped>
#empty-wishlist {
  text-align: center;
}

.content {
  display: flex;
  flex-direction: column;
}

.wishlist-actions {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.clear-wishlist-btn {
  background-color: red;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.product-list-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  order: 2;
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
}
</style>
