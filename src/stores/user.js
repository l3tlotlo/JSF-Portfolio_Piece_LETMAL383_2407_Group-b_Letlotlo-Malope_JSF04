/* eslint-disable prettier/prettier */
import { defineStore } from "pinia";
import { useRouter } from "vue-router"; // Import router

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    isLoggedIn: false,
    username: "",
    userId: 0,
    token: "",
  }),
  getters: {
    getIsLogged: (state) => state.isLoggedIn,
    getUsername: (state) => state.username,
    getUserId: (state) => state.userId,
    getUserToken: (state) => state.token,
  },
  actions: {
    setUser(username, token, id) {
      this.username = username;
      this.token = token;
      this.userId = id;
      this.isLoggedIn = true;
    },
    logout() {
      const router = useRouter(); // Initialize the router
      let res = confirm("Confirm Logout");

      if (res) {
        this.username = "";
        this.token = "";
        this.isLoggedIn = false;
        this.userId = 0;

        // Navigate to the login page after logout
        router.push("/login");
      }
    },
  },
  persist: true,
});
