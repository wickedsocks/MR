<template>
  <div class="wrap-header-cart js-panel-cart" :class="{'show-header-cart': showHide}">
    <div class="s-full js-hide-cart" @click.self="close()"></div>

    <div class="header-cart flex-col-l p-l-65 p-r-25" :class="{'right-0': showHide}">
      <div class="header-cart-title flex-w flex-sb-m p-b-8">
        <span class="cl2 cart-name">
          Корзина
        </span>

        <div class="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart" @click="close()">
          <i class="zmdi zmdi-close"></i>
        </div>
      </div>

      <div class="header-cart-content flex-w js-pscroll">
        <ul class="header-cart-wrapitem w-full">
          <li class="header-cart-item flex-w flex-t m-b-12 align-items-center" v-for="(item, index) in products" :key="index">
            <product-item-for-sidebar :item="item"/>
            <!-- <div class="header-cart-item-img" @click="removeItemFromBucket(index)">
              <img :src="item.product.images[0]" :alt="item.product.description">
              <i class="zmdi zmdi-close delete-item-icon"></i>
            </div>

            <div class="header-cart-item-txt p-t-8">
              <nuxt-link @click.native="close()" :to="`/product/${item.product._id}`" class="header-cart-item-name m-b-18 hov-cl1 trans-04">
                {{item.product.title}}
              </nuxt-link>

              <span class="header-cart-item-info">
                {{item.quantity}} x {{item.product.price}} грн
              </span>
            </div> -->

          </li>
        </ul>

        <div class="w-full">
          <div class="header-cart-total w-full p-tb-40">
            Всего: {{totalBucketPrice}} грн
          </div>

          <div class="header-cart-buttons flex-w w-full">
            <nuxt-link @click.native="close()" to='/bucket' class="flex-c-m cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10 bucket-button">
              ЗАКАЗАТЬ
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductItemForSidebar from "../components/ProductItemForSidebar.vue";
import storeService from "~/services/storeServices.js";
export default {
  props: ["showHide"],
  components: { ProductItemForSidebar },
  computed: {
    totalBucketPrice() {
      return this.$store.getters.totalBucketPrice;
    }
  },
  data() {
    return {
      products: this.$store.state.bucket
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    removeItemFromBucket(index) {
      this.$store.commit("removeItemFromBucketByIndex", { index });
      storeService.removeCookie("mrbucket");
      storeService.setCookieBucket(this.$store.state);
    }
  }
};
</script>

<style lang="scss" scoped>
.right-0 {
  right: 0px;
}

.bucket-button {
  font-family: sans-serif;
  font-weight: 500;
}

.cart-name {
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
}
</style>
