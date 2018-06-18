<template>
  <section class='row no-gutters'>
    <div class="col-12 col-sm-12  col-md-2 col-lg-2">
      <naviagation-side-bar/>
    </div>
    <div class="col-12 col-sm-12 col-md-10 col-lg-10">
      <my-product-list :products='products' />
    </div>
  </section>
</template>

<script>
import MyProductList from "~/components/ProductList.vue";
import NaviagationSideBar from "~/components/NaviagationSideBar.vue";
export default {
  components: {
    MyProductList,
    NaviagationSideBar
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
