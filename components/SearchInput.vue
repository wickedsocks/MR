<template>
  <div class="position-relative">
    <div class="icon-header-item cl2 hov-cl1 trans-04 pl-2 pr-2 js-show-modal-search d-flex align-items-center">
      <input type="text" id='search' v-model="title" :input="getSearchData()" class="form-control" placeholder="Искать...">
      <label for="search" class="input-group-btn pl-2 mb-0">
        <i class="zmdi zmdi-search"></i>
      </label>
    </div>
    <div class="col-12 search-preview" v-if="products && products.length > 0">
      <!-- <product-item-for-search-dropdown :item="product" /> -->
      <product-item-for-search-dropdown :item="product" v-for="(product, index) in products" :key="index" />
    </div>
  </div>
</template>

<script>
import StoreServices from "~/services/storeServices.js";
import ProductItemForSearchDropdown from "~/components/ProductItemForSearchDropdown.vue";
import _ from "lodash";
export default {
  components: {
    ProductItemForSearchDropdown
  },
  data() {
    return {
      title: "",
      products: []
    };
  },
  methods: {
    getSearchData: function() {
     console.log(this);
    },
    getProducts() {
      // let self = this;
      StoreServices.searchProductsByTitle(this.title).then((success) => {
       this.products = success.data;
      }, (err) => {
       console.log('err ', err);
      })
    }
  },
  created() {
    this.debouncedProducts = _.debounce(this.getProducts, 500)
  },
  watch: {
    title() {
      this.debouncedProducts();
    }
  }
};
</script>

<style lang="scss" scoped>
.search-preview {
  background-color: #ffffff;

  position: absolute;
}
</style>
