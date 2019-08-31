<template>
  <section>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-2 col-lg-2">
        <navigation-side-bar :activeCat="category" :categoryTitle="title"/>
      </div>
      <div class="col-12 col-sm-12 col-md-10 col-lg-10">
        <h1 class="my-4">{{title}}</h1>
        <div class="row">
          <product :product="product" v-for="(product, index) in products" :key="index"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import storeServices from "~/services/storeServices.js";
import Product from "~/components/Product.vue";
import NavigationSideBar from "~/components/NavigationSideBar.vue";
import _ from "lodash";
export default {
  head() {
    return {
      title: `${this.title} - купить от ${
        this.products[0].productProperties[0].price
      } грн. в православном интернет магазине икон, доставка по Харькову, Киеву, Москве`,
      link: [
        {
          rel: "canonical",
          href: `https://www.mykhailovskie-ryadi.com/categories/${
            this.$route.params.url
          }`
        }
      ]
    };
  },
  props: [],
  async asyncData({ params, store, redirect }) {
    try {
      let products = await storeServices.getCategoryProducts(params.url);
      storeServices.pushProducts(store, products.data.products);
      let category = store.getters.getCategoryByUrl(params.url);
      let title = _.capitalize(category.name);
      return {
        products: products.data,
        title,
        category
      };
    } catch (err) {
      redirect(301, "/404.html");
    }
  },
  components: {
    Product,
    NavigationSideBar
  },
  mounted() {
    console.log("this router ", this.$route.params.url);
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 26px;
}
</style>
