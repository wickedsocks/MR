<template>
  <section>
    <my-product-list :products='products'/>
  </section>
</template>

<script>
import MyProductList from "~/components/ProductList.vue";
import axios from "~/plugins/axios";
export default {
  components: {
    MyProductList
  },
  async asyncData() {
    let products = await axios.get("/api/products");
    return {
      products: products.data
    };
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
