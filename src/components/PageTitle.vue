<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="page-title">
    <h1>{{ title }}</h1>
  </div>
</template>

<style scoped>
.page-title {
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
}
</style>
