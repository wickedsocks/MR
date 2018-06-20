<template>
  <div>
    <nuxt-link @click.native="close()" :to="`/product/${item._id}`" 
    class="header-cart-item-name hov-cl1 trans-04 d-flex p-3">
      <div class="header-cart-item-img">
        <img :src="item.images[0]" :alt="item.description">
      </div>

      <div class="header-cart-item-txt p-t-8 d-flex flex-column justify-content-between">
        <span class="text-decoration">
          {{item.title | limitTo(30)}}...
        </span>
        <span class="header-cart-item-info">
          {{item.price}} грн
        </span>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  &:hover {
    text-decoration: none;
    background-color: rgba(136, 136, 136, .2);
    .text-decoration {
      text-decoration: underline;
    }
  }
}
</style>

