<template>
  <div class="pt-4">
    <h4 class="catgories-name cl2 pb-4">
      Категории
    </h4>

    <ul>
      <li v-for="(cat, index) in allCategories" :key="index">
        <a href="#" class="dis-block category-link cl6 hov-cl1 trans-04 p-tb-8 p-lr-4">
          {{cat.name}}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    allCategories() {
      return this.$store.state.categories.productCategory.concat(
        this.$store.state.categories.manufactureCategory
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.catgories-name {
  color: #333333;
  font-size: 22px;
  line-height: 1.333333;
  font-weight: 600;
}
.category-link {
  font-family: sans-serif;
  border-bottom: 1px solid #e6e6e6;
}
</style>
