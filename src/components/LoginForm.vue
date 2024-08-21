<script setup>
import { reactive } from "vue";
import { useUserStore } from "@/stores/user";

import LoaderSpinner from "@/components/LoaderSpinner.vue";

const user = useUserStore();

const form = reactive({
  username: "",
  password: "",
  hasError: false,
  errorMsg: "",
  isLoading: false,
});


</script>

<template>
  <LoaderSpinner v-if="form.isLoading" />

  <form v-else action="" @submit.prevent="onSubmit">
   
    <input
      type="text"
      v-model="form.username"
      placeholder="User"
      name="username"
      id="username"
    />

    <input
      type="password"
      v-model="form.password"
      placeholder="Password"
      name="password"
      id="password"
    />

    <p v-if="form.hasError" class="has-errors">{{ form.errorMsg }}</p>

    <button @click="login" class="sign-btn">Login</button>
  </form>
</template>

<style scoped>
form {
  width: 100%;
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
}

form input {
  display: block;
  width: 100%;
  margin: 5px auto;
  border-radius: 5px;
  border: 1px solid var(--color-border);
  padding: 5px;
}

.sign-btn {
  display: block;
  color: white;
  margin: 0 auto;
  padding: 6px 1.3rem;
  font-weight: bold;
  background-color: hsla(160, 100%, 37%, 1);
  width: 50%;
  border: 0;
}

.has-errors {
  background-color: red;
  color: white;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 5px;
}

@media (min-width: 750px) {
  form {
    width: 60%;
    margin: 0 auto;
  }
}
</style>
