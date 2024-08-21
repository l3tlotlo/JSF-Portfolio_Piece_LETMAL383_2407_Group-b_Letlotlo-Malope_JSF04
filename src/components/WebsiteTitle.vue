<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="title-container">
    <h2 class="green">{{ msg }}</h2>
  </div>
</template>

<style scoped>
h2 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

.title-container h2 {
  text-align: center;
  margin-top: 1rem;
}

.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}
</style>
