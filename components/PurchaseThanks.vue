<template>
  <div class="wrapper">
    <div class="thank-words d-flex align-items-center">
      <i class="zmdi zmdi-check"></i>Спасибо, ваш заказ принят
    </div>
    <div class="payment-type">{{paymentType}}</div>
    <div class="order-number">Заказ №{{orderNumber}}</div>
    <div class="order-card">
      <div class="items-list" v-for="(item, index) in bucket" :key="index">
        <img :src="item.product.images[0]" alt />
        <div class="item-data">
          <div class="item-title">Наименование: {{item.product.title}}</div>
          <div>Кол-во: {{item.quantity}}</div>
          <span>Цена:{{item.quantity * item.product.productProperties[item.sizeIndex].price}} грн</span>
        </div>
      </div>
      <div class="delivery-payment">
        <div class="delivery-title">
          <div>Способ оплаты:</div>
          <div>Доставка:</div>
        </div>
        <div class="delivery-description">
          <div>Наличный</div>
          <div>По тарифам перевозчика</div>
        </div>
      </div>
      <div class="amount">
        <span>Итого к оплате:</span> {{totalBucketPrice}} грн
        </div>
    </div>
    <div class="order-info">
      Внимание! С Вами свяжется наш менеджер чтобы уточнить информацию по Вашим комментариев, если Вы их оставляли. Либо же для подтверждения заказа <span>№ {{orderNumber}}</span>
    </div>
  </div>
</template>

<script>
import storeService from "~/services/storeServices.js";

export default {
  data() {
    return {
      paymentType: "Оплата при получении",
      orderNumber: "2322322"
    };
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
    this.close();
  },
  mounted() {
    console.log("this bucket ", this.bucket);
  }
};
</script>

<style lang="scss" scoped>
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

.order-number {
  color: rgb(155, 155, 155);
}

.order-card {
  box-shadow: -1px 0px 12px 0px rgba(128, 128, 128, 0.3);
  border-radius: 5px;
  margin-top: 20px;
  padding: 25px 0 0 0;
}

.items-list {
  display: flex;
  padding-bottom: 20px;
  padding: 25px 50px;
  img {
    height: 100px;
    width: auto;
  }
  .item-title {
    text-transform: uppercase;
  }
}
.item-data {
  padding-left: 25px;
}

.delivery-payment {
  border-top: 1px solid rgb(155, 155, 155);
  margin: 25px 50px 0 50px;
  padding: 25px 0;
  display: flex;
}

.delivery-title {
  margin-right: 100px;
}

.amount {
  border-top: 1px solid rgb(155, 155, 155);
  margin: 25px 50px;
  padding: 25px 0;
  font-size: 20px;
  font-weight: 400;
  span {
    padding-right: 50px;
  }
}

.order-info {
  margin-top: 50px;
  span {
    font-size: 18px;
    font-weight: 500;
  }
}
</style>

