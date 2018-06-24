<template>
  <div class="d-flex w-100">
    <div class="header-cart-item-img pointer-none">
      <img :src="item.product.images[0]" :alt="item.product.description">
    </div>

    <div class="header-cart-item-txt p-t-8 d-flex flex-column justify-content-between">
      <nuxt-link @click.native="close()" :to="`/product/${item.product._id}`" class="header-cart-item-name hov-cl1 trans-04">
        {{item.product.title}}
      </nuxt-link>
      <div class="d-flex">
        <span class="header-cart-item-info">
          {{item.quantity}} x {{item.product.price}} грн
        </span>
        <span class="delete-word header-cart-item-info pointer" @click="deleteItemFromBucket()">
          удалить
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    close() {
      this.$emit("close");
    },
    deleteItemFromBucket() {
      this.$emit("deleteIndex");
    }
  }
};
</script>

<style lang="scss" scoped>
.delete-word {
  display: inline-block;
  margin-left: 20px;
  text-transform: capitalize;
  &:hover {
    text-decoration: underline;
    color: #717fe0;
  }
}
</style>

