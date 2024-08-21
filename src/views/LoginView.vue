<script setup>
import PageTitle from "@/components/PageTitle.vue";
import LoginForm from "@/components/LoginForm.vue";
import { onMounted, reactive } from "vue";
import { useUserStore } from "@/stores/user";
import { useWishlistStore } from "@/stores/wishlist";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const wishlistStore = useWishlistStore();
const router = useRouter(); // Add the router for navigation

const users = reactive({
  list: [],
});

// Fetch available users from the API
async function availableUsers() {
  const userList = await fetch("https://fakestoreapi.com/users");
  return userList.json();
}

// On component mount, fetch users and synchronize wishlist if logged in
onMounted(() => {
  availableUsers().then((data) => {
    users.list = data;
  });

  // Sync wishlist with API if user is already logged in
  if (userStore.isLoggedIn) {
    wishlistStore.syncWishlistWithAPI();
  }
});

// Method to handle logout
function handleLogout() {
  userStore.logout();
  router.push("/login"); // Redirect to login page after logout
}
</script>

<template>
  <div v-if="!userStore.isLoggedIn">
    <PageTitle title="Sign in" />
    <LoginForm />

    <!-- Display a table of users and their passwords -->
    <table>
      <tr>
        <th colspan="2">Users And Passwords</th>
      </tr>
      <tr>
        <th>Username</th>
        <th>Password</th>
      </tr>
      <tr v-for="user in users.list" :key="user.id">
        <td>{{ user.username }}</td>
        <td>{{ user.password }}</td>
      </tr>
    </table>
  </div>

  <!-- Show logout button if user is logged in -->
  <button v-else class="logout-btn" @click="handleLogout">Log out</button>
</template>

<style scoped>
.logout-btn {
  display: block;
  background-color: red;
  color: white;
  border: 0;
  margin: 0 auto;
  padding: 6px 1.3rem;
  width: 40%;
  border-radius: 5px;
  font-size: 20px;
}

table,
th,
td {
  border: 1px solid var(--color-border);
  border-collapse: collapse;
  padding: 5px;
}

table {
  margin: 15px auto;
}
</style>
