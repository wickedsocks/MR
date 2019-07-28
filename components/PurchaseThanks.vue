<template>
  <div class="wrapper">
    <div class="thank-words d-flex align-items-center">
      <i class="zmdi zmdi-check"></i>Спасибо, ваш заказ принят</div>
    <div class="payment-type">{{paymentType}}</div>
    <div class="order-number">№{{orderNumber}}</div>
    <div class="order-card">
      <div class="items-list" v-for="(item, index) in bucket" :key='index'>
        <img :src="item.product.images[0]" alt="">
        <span>{{item.product.title}}</span>
        <span>{{item.quantity}}</span>
        <span>{{item.sizeIndex}}</span>
      </div>
      <div class="delivery-payment">{{orderNumber}}</div>
      <div class="amount">{{totalBucketPrice}} грн</div>
    </div>
    <div class="order-info"></div>
  </div>
</template>

<script>
import storeService from "~/services/storeServices.js";

export default {
  data() {
    return {
      paymentType: 'Оплата при получении',
      orderNumber: '2322322'
    }
  },
  computed: {
    bucket() {
      return this.$store.state.bucket;
    },
    totalBucketPrice() {
      return this.$store.getters.totalBucketPrice;
    }
  },
  methods: {
    close() {
      storeService.removeLocalStorageBucket("mrbucket");
      this.$store.commit("cleanBucket");
    }
  },
  destroyed() {
    // this.close();
  },
  mounted() {
    console.log('this bucket ', this.bucket);
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  
}
.thank-words {
  font-size: 24px;
  line-height: 1.29167em;
  position: relative;
  padding-bottom: 10px;
  .zmdi-check {
    position: absolute;
    font-size: 24px;
    left: -23px;
    color: green;
    font-weight: bold;
  }
}
.payment-type {
  padding-bottom: 5px;
}

</style>

