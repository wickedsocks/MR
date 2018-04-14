<template>
  <section>
    <my-product-list :products='products'/>
  </section>
</template>

<script>
import MyProductList from "~/components/ProductList.vue";
export default {
  components: {
    MyProductList
  },
  computed: {
    products() {
      return this.$store.state.products;
    }
  },
  data() {
    return {
      data: {}
    };
  },
  head() {
    return {
      title: "Каталог товара",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "User list for app"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
section {
  margin-bottom: 50px;
}
</style>
