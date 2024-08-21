<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { useUserStore } from "@/stores/user";
import { useWishlistStore } from "@/stores/wishlist"; // Import Wishlist store

import WebsiteTitle from "@/components/WebsiteTitle.vue";

const cartStore = useCartStore();
const userStore = useUserStore();
const wishlistStore = useWishlistStore(); // Initialize Wishlist store
</script>

<template>
  <header>
    <!--<img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    /> -->

    <div class="wrapper">
      <WebsiteTitle msg="StoreApp" />

      <p id="user-msg" v-if="userStore.isLoggedIn">
        User: {{ userStore.getUsername }}
      </p>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        
        <RouterLink to="/cart">
          &#128722; Cart ( {{ cartStore.getCartLength }} )
        </RouterLink>
        <RouterLink to="/wishlist">
          &#9733; Wishlist ( {{ wishlistStore.getWishlistLength }} )
        </RouterLink>
        <RouterLink to="/login">
          {{ userStore.isLoggedIn ? "Logout" : "Sign in" }}
        </RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>

  <footer>
    <p><b> Letlotlo Malope ® </b></p>
  </footer>
</template>

<style>
@import "@/assets/base.css";

#app {
  /*font-weight: normal;*/
}

#user-msg {
  font-weight: bold;
  text-align: center;
}

button {
  cursor: pointer;
}

main {
  width: 80%;
  margin: 0 auto;
  min-height: 75vh;
}

header {
  line-height: 1.5;
  max-height: 100vh;
  padding-bottom: 1rem;
}

a {
  text-decoration: none;
  color: var(--color-text);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

.wrapper {
  width: 100%;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 0.6rem;
}

nav a.router-link-exact-active {
  color: hsla(160, 100%, 37%, 1);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

footer {
  width: 100%;
  text-align: center;
  padding: 1rem;
  color: white;
  margin-top: 1rem;
  background-color: hsla(160, 100%, 37%, 1);
}

@media (max-width: 1024px) {
  main {
    width: 95%;
  }
}
</style>
