<template>
  <div>
    <select class="custom-select" name="itemLimitPerPage" v-model="itemLimitPerPage">
      <option value disabled>Количество товаров</option>
      <option :value="count" v-for="(count, index) in availableCount" :key="index">{{count}}</option>
    </select>
  </div>
</template>
<script>
import storeService from "~/services/storeServices";
export default {
  data() {
    return {
      availableCount: [10, 20, 30, 40, 50]
    };
  },
  computed: {
    itemLimitPerPage: {
      get() {
        return this.$store.getters.productsLimit;
      },
      set(newValue) {
        storeService.changeProductsLimit(this.$store, newValue);
      }
    },
  }
};
</script>
<style lang="scss" scoped>
</style>


