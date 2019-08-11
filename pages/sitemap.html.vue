<template>
  <section>
    <ul>
      <li>
        <span class="title">Иконы</span>
        <ul>
          <li class="p-b-6" v-for="(product, index) in products" :key="index">
            <nuxt-link class="filter-link stext-106 trans-04 active-category" :to="`/ikona/${product.url}`">{{product.title}}</nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
    <ul>
      <li>
        <span class="title">Категории</span>
        <ul>
          <li class="p-b-6" v-for="(cat, index) in categories" :key="index" v-if="cat.used">
            <nuxt-link
              :to="'/products-by-categories/' + cat.url"
              class="filter-link stext-106 trans-04 active-category"
            >{{ cat.name }}</nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  computed: {
    products() {
      return this.$store.state.products;
    },
    categories() {
      return this.$store.state.categories;
    }
  }
};
</script>

<style lang='scss' scoped>
.title {
  font-weight: bold;
  font-size: 16px;
}
ul {
  margin-left: 30px;
  margin-top: 15px;
}
</style>
