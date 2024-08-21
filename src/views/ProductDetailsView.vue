<script setup>
import LoaderSpinner from "@/components/LoaderSpinner.vue";
import ProductDetails from "@/components/ProductDetails.vue";
</script>

<template>
  <LoaderSpinner v-if="loadingProd" />

  <div v-else>
    <ProductDetails :data="data" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      loadingProd: false,
    };
  },
  methods: {
    async getProduct(prodId) {
      await fetch("https://fakestoreapi.com/products/" + prodId)
        .then((res) => res.json())
        .then((product) => (this.data = product));

      this.loadingProd = false;
    },
  },
  mounted() {
    this.loadingProd = true;
    this.getProduct(this.$route.params.id);
  },
};
</script>

<style scoped></style>
