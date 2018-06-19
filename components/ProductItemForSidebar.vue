<template>
  <div class="d-flex w-100">
    <div class="header-cart-item-img" @click="removeItemFromBucket(index)">
      <img :src="item.product.images[0]" :alt="item.product.description">
      <i class="zmdi zmdi-close delete-item-icon"></i>
    </div>

    <div class="header-cart-item-txt p-t-8 d-flex flex-column justify-content-between">
      <nuxt-link @click.native="close()" :to="`/product/${item.product._id}`" class="header-cart-item-name hov-cl1 trans-04">
        {{item.product.title}}
      </nuxt-link>

      <span class="header-cart-item-info">
        {{item.quantity}} x {{item.product.price}} грн
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"]
};
</script>

<style lang="scss" scoped>
.delete-item-icon {
  color: #ffffff;
  background-color: rgba(70, 70, 70, 0.56863);
  font-size: 24px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}
.header-cart-item-img {
  &:hover {
    & > .delete-item-icon {
      opacity: 1;
    }
  }
}
</style>

