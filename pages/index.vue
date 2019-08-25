<template>
  <section class="row">
    <div class="col-12 col-sm-12 col-md-2 col-lg-2">
      <navigation-side-bar :activeCat="activeCat" />
    </div>
    <div class="col-12 col-sm-12 col-md-10 col-lg-10">
      <div class="d-flex justify-content-between">
        <h1 class="my-4">Православные иконы</h1>
        <div class="d-flex flex-column align-items-end justify-content-center align-self-baseline">
          <span>Количество товаров</span>
          <div class="ml-3">
            <pagination-filter />
          </div>
        </div>
      </div>
      <div class="row">
        <!-- <categories-drill-down-card :category='category' v-for="(category, index) in actualCategoriesList" :key="index"/> -->
        <product :product="product" v-for="(product, index) in products" :key="index"/>
      </div>
      <div class="row">
        <pagination-buttons />
      </div>
    </div>
  </section>
</template>

<script>
import Product from "~/components/Product.vue";
import NavigationSideBar from "~/components/NavigationSideBar.vue";
import PaginationFilter from "~/components/PaginationFilter.vue";
import PaginationButtons from "~/components/PaginationButtons.vue";
import CategoriesDrillDownCard from "~/components/CategoriesDrillDownCard.vue";
import categoryService from '~/services/categoryService.js';

export default {
  components: {
    Product,
    NavigationSideBar,
    PaginationFilter,
    PaginationButtons,
    CategoriesDrillDownCard
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    actualCategoriesList() {
      return categoryService.actualCategoriesList(this.activeCat, this.$store);
    }
  },
  mounted() {
    console.log('this products ', this.products);
  },
  data() {
    return {
      data: {},
      activeCat: ""
    };
  },
  head() {
    return {
      title: "Михайловские ряды - интернет-магазин православных икон и утвори",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Купить или заказать онлайн иконы, православные подарки и сувениры в православном интернет-магазине Михайловские ряды с бесплатной доставкой по Харькову, Харьковской области, Киеву и Одессы, по всей Украине"
        },
        {
          hid: "keywords",
          name: "keywords",
          content: `Купить иконостасы, иконы, Спасителя, Иисус Христос, Богородица, сувениры, православные подарки`
        }
      ],
      link: [
        {
          rel: "canonical",
          href: `https://www.mykhailovskie-ryadi.com`
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
h1 {
  font-size: 26px;
}
</style>
