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
      title: "Михайловские ряды - православный интернет-магазин икон и православной утвори",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Купить или заказать онлайн иконы, православные подарки и сувениры в православном интернет-магазине Михайловские ряды с бесплатной доставкой по Харькову, Харьковской области, Киеву и Одессы, по всей Украине"
        },
        {
          hid: "keywords",
          name: "keywords",
          content: `Купить иконостасы, иконы, Спасителя, Иисус Христос, Богородица, сувениры, православные подарки`,
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
