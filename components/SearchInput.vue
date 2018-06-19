<template>
  <div class="icon-header-item cl2 hov-cl1 trans-04 pl-2 pr-2 js-show-modal-search d-flex align-items-center">
    <input type="text" id='search' v-model="title" :input="getSearchData(title)" class="form-control" placeholder="Искать...">
    <label for="search" class="input-group-btn pl-2 mb-0">
      <i class="zmdi zmdi-search"></i>
    </label>
  </div>
</template>

<script>
import StoreServices from "~/services/storeServices.js";
import _ from "lodash";
export default {
  data() {
    return {
      title: ""
    };
  },
  methods: {
    getSearchData: _.debounce(title => {
      if (title && title.trim().length > 0) {
        StoreServices.searchProductsByTitle(title).then(
          success => {
            console.log("success ", success);
          },
          err => {
            console.log("err ", err);
          }
        );
      }
    }, 500)
  }
};
</script>

<style lang="scss" scoped>
</style>
