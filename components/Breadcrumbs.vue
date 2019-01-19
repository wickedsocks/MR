<template>
  <section>
    <ul  class="d-flex flex-wrap" itemscope itemtype="http://schema.org/BreadcrumbList">
      <li itemscope itemtype="http://schema.org/ListItem">
        <nuxt-link class="category-link cl6 hov-cl1" to="/" itemprop="item"><span itemprop="name">Главная</span></nuxt-link>
        <span> / </span> 
      </li>
      <li v-for="(link, index) in links" :key="index" itemscope itemtype="http://schema.org/ListItem"
      itemprop="position">
        <nuxt-link class="category-link cl6 hov-cl1" :to="`/categories/${link.url}`" itemprop="item"> <span itemprop="name">{{link.title }}</span></nuxt-link>
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


