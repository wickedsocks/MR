<template>
  <div class="position-relative flex-grow-1 ml-5 search-input-wrapper">
    <div class="icon-header-item cl2 hov-cl1 trans-04 pr-2 d-flex align-items-center">
      <input type="text" id='search' ref='input' v-model="title" class="form-control" placeholder="Искать..." autocomplete="off">
      <label for="search" class="input-group-btn pl-2 mb-0" ref="label">
        <i class="zmdi zmdi-search" ref="icon"></i>
      </label>
    </div>
    <div class="col-12 search-preview" v-if="products && products.length > 0">
      <product-item-for-search-dropdown @close="closeDropDown()" :item="product" v-for="(product, index) in products" :key="index" />
    </div>
    <div 
    @click="closeDropDown()"
    class="cloak trans-04" :style="{visibility: products && products.length > 0 ? 'visible' : 'hidden', 'background-color': products && products.length > 0 ? 'rgba(0, 0, 0, 0.6)' : 'transparent'}"></div>
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
    getProducts() {
      StoreServices.searchProductsByTitle(this.title).then(
        success => {
          this.products = success.data;
          console.log("success ", success.data);
        },
        err => {
          console.log("err ", err);
        }
      );
    },
    closeDropDown() {
      this.title = "";
      this.products = [];
    }
  },
  created() {
    this.debouncedProducts = _.debounce(this.getProducts, 500);
  },
  watch: {
    title() {
      if (this.title && this.title.trim().length > 0) {
        this.debouncedProducts();
      } else {
        this.closeDropDown();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.search-input-wrapper {
  max-width: 350px;
  z-index: 1;
}
.search-preview {
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  position: absolute;
  padding: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  max-height: 500px;
}
.cloak {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: transparent;
  visibility: hidden;
  z-index: -1;
}
.icon-header-item {
  background-color: #ffffff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>
