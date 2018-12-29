<template>
  <section>
    <div class="row">
      <div class="col-12 col-sm-12  col-md-2 col-lg-2">
        <navigation-side-bar :activeCat="title" />
      </div>
      <div class="col-12 col-sm-12 col-md-10 col-lg-10">
        <h3 class="my-4">Каталог товара
          <small>{{title}}</small>
        </h3>
        <div class="row">
          <product :product="product" v-for="(product, index) in products" :key="index" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import storeServices from '~/services/storeServices.js';
import Product from '~/components/Product.vue';
import NavigationSideBar from '~/components/NavigationSideBar.vue';
import _ from 'lodash';
export default {
  props: [],
  async asyncData({ params, store, redirect }) {
    try {
      let products = await storeServices.getCategoryProducts(params.url);
      // NOTE: categories doesn't work proper
      let title = _.capitalize(store.getters.getCategoryByUrl(params.url).name);
      return {
        products: products.data,
        title
      };
    } catch (err) {
      redirect('/404.html');
    }
  },
  components: {
    Product,
    NavigationSideBar
  }
};
</script>

<style lang="scss" scoped>
</style>
