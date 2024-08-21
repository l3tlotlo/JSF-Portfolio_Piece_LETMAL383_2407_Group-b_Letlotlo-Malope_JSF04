<template>
  <div class="loader"></div>
</template>

<style scoped>
.loader {
  border: 10px solid #f3f3f3; /* Light grey */
  border-top: 10px solid hsla(160, 100%, 37%, 1);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin: 1rem auto;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>