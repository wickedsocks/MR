<template>
  <section>
    <ul  class="d-flex flex-wrap">
      <li>
        <nuxt-link class="category-link cl6 hov-cl1" to="/">Главная</nuxt-link>
        <span> / </span> 
      </li>
      <li v-for="(link, index) in links" :key="index">
        <nuxt-link class="category-link cl6 hov-cl1" :to="`/categories/${link.url}`">{{link.title }}</nuxt-link>
        <span v-if="links.length - 1 != index"> / </span> 
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  props:['links']
};
</script>
<style lang="scss" scoped>
li {
  white-space: pre-wrap;
}
</style>


