<template>
  <div class="pt-4">
    <!-- NOTE: block below just for desktop -->
    <div class="d-none d-md-block">
      <h4 class="catgories-name cl2 pb-4">Категории</h4>
      <ul class="navigation-main-menu">
        <li>
          <nuxt-link
            to="/"
            class="dis-block category-link cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
            :class="{'active-category': categoryTitle == undefined || ''}"
          >Все иконы</nuxt-link>
        </li>
        <!-- NOTE: back to parent category LI -->
        <li>
          <nuxt-link
            v-if="parentCategory"
            :to="'/products-by-categories/' + parentCategory.url"
            class="dis-block category-link cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
            :class="{'active-category': lowerCase(categoryTitle) == lowerCase(parentCategory.name)}"
          >Назад к {{parentCategory.name}}</nuxt-link>
        </li>
        <li>
          <nuxt-link
            v-if="activeCat"
            :to="'/products-by-categories/' + activeCat.url"
            class="dis-block category-link cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
            :class="{'active-category': lowerCase(categoryTitle) == lowerCase(activeCat.name)}"
          >{{activeCat.name}}</nuxt-link>
        </li>
        <li
          v-for="(cat, index) in categoriesList"
          :key="index"
          v-if="cat.used && cat._id !== activeCat._id"
        >
          <nuxt-link
            :to="'/products-by-categories/' + cat.url"
            class="dis-block category-link cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
            :class="{'active-category': lowerCase(categoryTitle) == lowerCase(cat.name)}"
          >{{cat.name}}</nuxt-link>
          <!-- NOTE: this is hover sub menu -->
          <ul class="sub-categories-menu" v-if="subCategoryDrillDown(cat).length > 0">
            <li class="p-b-6" v-for="(subCat, index) in subCategoryDrillDown(cat)" :key="index">
              <nuxt-link
                @click.native="toggleFilters()"
                :to="'/products-by-categories/' + subCat.url"
                class="filter-link stext-106 trans-04 active-category"
                :class="{'active-category': lowerCase(categoryTitle) == lowerCase(subCat.name)}"
              >{{ subCat.name }}</nuxt-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- NOTE: this is mobile menu -->
    <div class="d-md-none">
      <div
        class="flex-c-m cl6 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4 categories-title"
        @click="toggleFilters()"
        :class="{'show-filter': showFilters}"
      >
        <i class="icon-filter cl2 m-r-6 trans-04 zmdi zmdi-view-list zmdi-hc-lg"></i>
        <i class="icon-close-filter cl2 m-r-6 trans-04 zmdi zmdi-close dis-none zmdi-hc-lg"></i>
        Категории
      </div>
      <div class="panel-filter w-full p-t-10 cutsom-filter-behaviour" ref="categories">
        <div class="wrap-filter flex-w bg6 w-full p-lr-40 p-t-27 p-lr-15-sm">
          <div class="filter-col1 p-r-15 p-b-27">
            <div class="category-inside-name cl2 p-b-15">Название</div>

            <ul class="navigation-main-menu">
              <li class="p-b-6" v-for="(cat, index) in categoriesList" :key="index" v-if="cat.used">
                <nuxt-link
                  @click.native="toggleFilters()"
                  :to="'/products-by-categories/' + cat.url"
                  class="filter-link stext-106 trans-04 active-category"
                  :class="{'active-category': lowerCase(categoryTitle) == lowerCase(cat.name)}"
                >{{ cat.name }}</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import categoryService from "~/services/categoryService.js";

export default {
  props: ["activeCat", "categoryTitle"],
  data() {
    return {
      showFilters: false
    };
  },
  computed: {
    allCategories() {
      return this.$store.state.categories;
    },
    categoriesList() {
      console.log('categoryService.actualCategoriesList(this.activeCat, this.$store); ', categoryService.actualCategoriesList(this.activeCat, this.$store));
      return categoryService.actualCategoriesList(this.activeCat, this.$store);
    },
    parentCategory() {
      if (this.activeCat && this.activeCat.parentCategory) {
        return this.$store.getters.getCategoryById(
          this.activeCat.parentCategory
        );
      } else {
        return null;
      }
    }
  },
  methods: {
    subCategoryDrillDown(category) {
      return categoryService.actualCategoriesList(category, this.$store);
    },
    lowerCase(string) {
      return _.lowerCase(string);
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
      this.$refs.categories.style.height = this.$refs.categories.style.height
        ? null
        : this.$refs.categories.scrollHeight + "px";
    }
  },
  mounted() {
    console.log("all categories ", this.allCategories);
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/main.scss";
.catgories-name {
  color: #333333;
  font-size: 22px;
  line-height: 1.333333;
  font-weight: 600;
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
.active-category {
  color: $color-text-purple;
  text-decoration: underline;
}
.sub-categories-menu {
  display: none;
  position: absolute;
  left: 100%;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  top: 0;
  z-index: 9;
  min-width: 100%;
  padding: 20px;
  border-radius: 3px;
  li {
    a {
      text-decoration: none;
      color: #888;
      &:hover {
        color: #717fe0;
      }
    }
  }
}
.navigation-main-menu {
  li {
    position: relative;
    &:hover {
      .sub-categories-menu {
        display: block;
      }
    }
  }
}
</style>
