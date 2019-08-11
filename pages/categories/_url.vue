<template>
  <section class="row">
    <div class="col-12 col-sm-12 col-md-2 col-lg-2">
      <navigation-side-bar :activeCat="category" />
    </div>
    <div class="col-12 col-sm-12 col-md-10 col-lg-10">
      <div class="d-flex justify-content-between">
        <h1 class="my-4">{{category.name}}</h1>
        <!-- <div class="d-flex flex-column align-items-end justify-content-center align-self-baseline"> -->
          <!-- <span>Количество товаров</span> -->
          <!-- <div class="ml-3">
            <pagination-filter />
          </div> -->
        <!-- </div> -->
      </div>
      <div class="row">
        <categories-drill-down-card :category='cat' v-for="(cat, index) in actualCategoriesList" :key="index"/>
        <!-- <product :product="product" v-for="(product, index) in products" :key="index"/> -->
      </div>
      <!-- <div class="row"> -->
        <!-- <pagination-buttons /> -->
      <!-- </div> -->
    </div>
  </section>
</template>
<script>
import NavigationSideBar from "~/components/NavigationSideBar.vue";
import CategoriesDrillDownCard from "~/components/CategoriesDrillDownCard.vue";
import categoryService from '~/services/categoryService.js';

export default {
  components: {
    CategoriesDrillDownCard,
    NavigationSideBar
  },
  // head() {
  //   return {
  //     title: `${this.title} - купить от ${
  //       this.products[0].productProperties[0].price
  //     } грн. в православном интернет магазине икон, доставка по Харькову, Киеву, Москве`,
  //     link: [
  //       {
  //         rel: "canonical",
  //         href: `https://www.mykhailovskie-ryadi.com/categories/${
  //           this.$route.params.url
  //         }`
  //       }
  //     ]
  //   };
  // },
  async asyncData({ params, store, redirect }) {
    try {
      // let products = await storeServices.getCategoryProducts(params.url);
      let category = store.getters.getCategoryByUrl(params.url);
      let title = _.capitalize(category.name);
      return {
        // products: products.data,
        title,
        category
      };
    } catch (err) {
      redirect(301, "/404.html");
    }
  },
  computed: {
     actualCategoriesList() {
      return categoryService.actualCategoriesList(this.category, this.$store);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>