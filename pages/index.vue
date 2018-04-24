<template>
  <section>
    <my-product-list :products='products' />
  </section>
</template>

<script>
import MyProductList from "~/components/ProductList.vue";
import storeServices from "./../services/storeServices";
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
  },
  mounted() {
    // Check if cookie is available and set bucket data
    if (!this.$store.state.orders.length) {
      let cookieString = storeServices.getCookie("mrorders");
      if (cookieString) {
        let parsedCookie = JSON.parse(cookieString);
        parsedCookie.forEach(order => {
          this.$store.commit("addNewOrder", order);
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  margin-bottom: 50px;
}
</style>
