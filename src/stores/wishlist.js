// src/stores/wishlist.js
import { defineStore } from 'pinia';

export const useWishlistStore = defineStore({
  id: 'wishlist',
  state: () => ({
    wishlist: [],
  }),
  actions: {
    addToWishlist(product) {
      if (!this.wishlist.find(item => item.id === product.id)) {
        this.wishlist.push(product);
      }
    },
    removeFromWishlist(productId) {
      this.wishlist = this.wishlist.filter(item => item.id !== productId);
    },
    // Optional: fetch wishlist items or other actions
  },
  getters: {
    wishlistItems: (state) => state.wishlist,
    getWishlistLength: (state) => state.wishlist.length, // Add this getter
  },
});
