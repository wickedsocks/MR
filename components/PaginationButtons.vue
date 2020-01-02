<template>
  <div class="col-12">
    <button v-if="productsCount !== products.length" class="btn btn-success" @click="getMoreProducts()">Загрузить ещё товары</button>
    <button v-if="productsCount == products.length" class="btn btn-default">Все товары загруженны</button>
  </div>
</template>
<style lang="sass" scoped>

</style>
<script>
import storeService from "~/services/storeServices";
export default {
  computed: {
    paginationPagesCount() {
      return this.$store.getters.paginationPagesCount;
    },
    activePage() {
      return this.$store.getters.getActivePage;
    },
    products() {
      return this.$store.getters.getProducts;
    },
    productsCount() {
      return this.$store.getters.productsCount;
    },
    productsOffset() {
      return this.$store.getters.getProductsOffset;
    },
    productsLimit() {
      return this.$store.getters.productsLimit;
    }
  },
  methods: {
    async getMoreProducts() {
      if (this.products.length < this.productsCount) {
        try {
          let products = await storeService.getPaginationProducts(
            this.productsOffset,
            this.productsLimit
          );
          storeService.pushProducts(this.$store, products.data.products);
          let currentOffset = this.$store.getters.getProductsOffset;
          if (products.data.products && products.data.products.length) {
            let newOffset = currentOffset + products.data.products.length;
            storeService.updateProductsOffset(this.$store, newOffset);
          }
        } catch (error) {
          console.log("error ", error);
        }
      }
    }
  }
};
</script>


