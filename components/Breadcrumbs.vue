<template>
  <section>
    <ul class="d-flex flex-wrap" itemscope itemtype="http://schema.org/BreadcrumbList">
      <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
        <nuxt-link class="category-link cl6 hov-cl1" to="/" itemprop="item">
          <span itemprop="name">Главная</span>
        </nuxt-link>
        <span>/</span>
        <meta itemprop="position" content="1" />
      </li>
      <li
        itemprop="itemListElement"
        v-for="(link, index) in links"
        :key="index"
        itemscope
        itemtype="http://schema.org/ListItem"
      >
        <nuxt-link
          class="category-link cl6 hov-cl1"
          :to="`${link.url}`"
          itemprop="item"
        >
          <span itemprop="name"> {{link.title }}</span>
        </nuxt-link>
        <span v-if="links.length - 1 != index">/</span>
        <meta itemprop="position" :content="index + 2" />
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  props: ["links"]
};
</script>
<style lang="scss" scoped>
li {
  white-space: pre-wrap;
}
</style>


