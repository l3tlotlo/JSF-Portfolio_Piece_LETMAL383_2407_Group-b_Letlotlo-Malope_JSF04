<script setup>
import { useCartStore } from "@/stores/cart";
import { useUserStore } from "@/stores/user";
import { useWishlistStore } from "@/stores/wishlist";
import { reactive, onMounted, } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const cartStore = useCartStore();
const userStore = useUserStore();
const wishlistStore = useWishlistStore();
const router = useRouter();
const state = reactive({
  isInCart: false,
  isInWishlist: false,
  comments: [], // Holds fetched comments
  ratings: null, // Holds fetched ratings
});

async function fetchProductDetails(productId) {
  try {
    // Fetch comments
    const commentsResponse = await fetch(`https://api.example.com/products/${productId}/comments`);
    const commentsData = await commentsResponse.json();
    state.comments = commentsData;

    // Fetch ratings
    const ratingsResponse = await fetch(`https://api.example.com/products/${productId}/ratings`);
    const ratingsData = await ratingsResponse.json();
    state.ratings = ratingsData;
  } catch (error) {
    console.error('Error fetching product details:', error);
  }
}

function addToMyCart(prodObj) {
  if (!userStore.isLoggedIn) {
    alert("Please Sign in to add items to the cart.");
    return;
  }

  const prodInCart = cartStore.cart.find(
    (product) => product.id === prodObj.id
  );

  if (!prodInCart) {
    cartStore.addToCart(prodObj);
    state.isInCart = true;
  }
}

function deleteFromCart(prodObj) {
  cartStore.removeFromCart(prodObj);
  state.isInCart = false;
}

function addToMyWishlist(prodObj) {
  if (!userStore.isLoggedIn) {
    alert("Please Sign in to add items to the wishlist.");
    return;
  }

  const prodInWishlist = wishlistStore.wishlistItems.find(
    (item) => item.id === prodObj.id
  );

  if (!prodInWishlist) {
    wishlistStore.addToWishlist(prodObj);
    state.isInWishlist = true;
  }
}

function deleteFromWishlist(prodObj) {
  wishlistStore.removeFromWishlist(prodObj.id);
  state.isInWishlist = false;
}

function checkCart() {
  const prodInCart = cartStore.cart.find(
    (product) => product.id === props.data.id
  );
  state.isInCart = prodInCart ? true : false;
}

function checkWishlist() {
  const prodInWishlist = wishlistStore.wishlistItems.find(
    (item) => item.id === props.data.id
  );
  state.isInWishlist = prodInWishlist ? true : false;
}

onMounted(() => {
  checkCart();
  checkWishlist();
  fetchProductDetails(props.data.id); // Fetch comments and ratings on mount
});
</script>

<template>
  <div class="prod-card">
    <div class="img-container">
      <img :src="data.image" alt="product-img" />
    </div>
    <div class="details-container">
      <h1 class="prod-title">{{ data.title }}</h1>
      <div class="prod-cat">{{ data.category }}</div>
      <div class="prod-price">R{{ data.price }}</div>
      
      <!-- Cart Buttons -->
      <div class="add-btn" v-if="!state.isInCart" @click="addToMyCart(data)">Add to cart</div>
      <div class="rmv-btn" v-else @click="deleteFromCart(data)">Remove from cart</div>

      <!-- Wishlist Buttons -->
      <div class="wishlist-btn" v-if="!state.isInWishlist" @click="addToMyWishlist(data)">Add to wishlist</div>
      <div class="wishlist-rmv-btn" v-else @click="deleteFromWishlist(data)">Remove from wishlist</div>

      <!-- Comments and Ratings -->
      <div class="comments">
        <h2>Comments</h2>
        <div v-if="state.comments.length === 0">No comments yet.</div>
        <div v-for="comment in state.comments" :key="comment.id" class="comment">
          <strong>{{ comment.author }}:</strong> {{ comment.text }}
        </div>
      </div>
      
      <div class="ratings">
        <h2>Ratings</h2>
        <div v-if="state.ratings === null">No ratings available.</div>
        <div v-else>
          <strong>Average Rating:</strong> {{ state.ratings.average }}
          <div>
            <span v-for="star in state.ratings.average" :key="star" class="star">&#9733;</span>
            <span v-for="star in (5 - state.ratings.average)" :key="star" class="star">&#9734;</span>
          </div>
        </div>
      </div>

      <div class="prod-description">
        {{ data.description }}
      </div>

      <!-- Home button -->
      <div class="home-btn" @click="router.push('/')">Home</div>
    </div>
  </div>
</template>

<style scoped>
.prod-card {
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding-bottom: 1rem;
  overflow: hidden;
}

.details-container div {
  padding: 0.3rem 1rem;
}

.prod-title {
  font-weight: bold;
  text-align: center;
}

.prod-cat {
  text-align: center;
}

.prod-price {
  color: hsla(160, 100%, 37%, 1);
  font-weight: bold;
  text-align: center;
}

.add-btn,
.rmv-btn,
.wishlist-btn,
.wishlist-rmv-btn,
.home-btn {
  background-color: hsla(160, 100%, 37%, 1);
  text-align: center;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 0.5rem;
}

.rmv-btn {
  background-color: red !important;
}

.wishlist-rmv-btn {
  background-color: red !important;
}

.home-btn {
  background-color: blue !important;
}

.comments, .ratings {
  margin-top: 1rem;
}

.comment {
  padding: 0.5rem;
  border-bottom: 1px solid var(--color-border);
}

.star {
  color: gold;
  font-size: 1.2rem;
}

.prod-description {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
}

@media (max-width: 764px) {
  .img-container {
    background-color: white;
    height: 220px;
    position: relative;
    margin-bottom: 10px;
  }

  img {
    max-width: 200px;
    max-height: 200px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 0;
    right: 0;
  }
}

@media (min-width: 764px) {
  .prod-card {
    display: flex;
    padding-bottom: 0;
  }

  .img-container {
    background-color: white;
    height: 500px;
    width: 100%;
    position: relative;
  }

  img {
    max-width: 400px;
    max-width: 100%;
    max-height: 400px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 0;
    right: 0;
  }
}
</style>
