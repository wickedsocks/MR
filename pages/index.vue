<template>
  <section class='row'>
    <div class="col-12 col-sm-12  col-md-2 col-lg-2">
      <navigation-side-bar :activeCat="activeCat" />
    </div>
    <div class="col-12 col-sm-12 col-md-10 col-lg-10">
      <h3 class="my-4">Каталог товара
        <small>продукции</small>
      </h3>
      <div class="row">
        <product :product="product" v-for="(product, index) in products" :key="index" />
      </div>
    </div>
  </section>
</template>

<script>
import Product from "~/components/Product.vue";
import NavigationSideBar from "~/components/NavigationSideBar.vue";
export default {
  components: {
    Product,
    NavigationSideBar
  },
  computed: {
    products() {
      return this.$store.state.products;
    }
  },
  data() {
    return {
      data: {},
      activeCat: ""
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
