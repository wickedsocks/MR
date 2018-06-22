<template>
  <div class="pt-4">
    <div class="d-none d-md-block">
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
    <div class="d-md-none">
      <div class="flex-c-m cl6 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4 categories-title" @click='toggleFilters()' :class="{'show-filter': showFilters}">
        <i class="icon-filter cl2 m-r-6 trans-04 zmdi zmdi-view-list zmdi-hc-lg"></i>
        <i class="icon-close-filter cl2 m-r-6 trans-04 zmdi zmdi-close dis-none zmdi-hc-lg"></i>
        Категории
      </div>
      <div class="panel-filter w-full p-t-10 cutsom-filter-behaviour" ref='categories'>
        <div class="wrap-filter flex-w bg6 w-full p-lr-40 p-t-27 p-lr-15-sm">
          <div class="filter-col1 p-r-15 p-b-27">
            <div class="category-inside-name cl2 p-b-15">
              Название
            </div>

            <ul>
              <li class="p-b-6" v-for="(cat, index) in allCategories" :key="index">
                <a href="#" class="filter-link stext-106 trans-04">
                  {{ cat.name }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showFilters: false
    };
  },
  computed: {
    allCategories() {
      return this.$store.state.categories.productCategory.concat(
        this.$store.state.categories.manufactureCategory
      );
    }
  },
  methods: {
    toggleFilters() {
      this.showFilters = !this.showFilters;
      this.$refs.categories.style.height = this.$refs.categories.style.height
        ? null
        : this.$refs.categories.scrollHeight + "px";
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
.cutsom-filter-behaviour {
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
}
.categories-title {
  font-size: 18px;
  height: 40px;
}
.category-inside-name {
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 600;
}
</style>
