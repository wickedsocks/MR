<template>
  <section class="container">
    <div class="row">
      <h3 class="col-12">Корзина</h3>
    </div>
    <div class="row">
      <h5 class="col-12">Заказ</h5>
      <div class="col-12">
        <div class="product-item" @click="removeItemFromBucket(index)" v-for="(item, index) in bucket" :key="index">
          <img :src="item.product.images[0]" :alt="item.product.title"> {{item.product.title}}
          <span> {{item.quantity}}</span>
          <div class="close-main"></div>
        </div>
        <h5> Сумма к оплате: {{totalBucketPrice}} грн </h5>
      </div>
    </div>
    <form class="row" novalidate @submit.prevent="makeOrder">
      <div class="col-12 form-input-wrapper">
        <input class="form-control" type="text" v-validate:name="'required'" name="name" placeholder="Введите имя и фамилию" v-model="name">
        <span class="error-default" v-show="errors.has('name')"> {{errors.first('name')}} </span>
      </div>
      <div class="col-12 form-input-wrapper">
        <input class="form-control" type="text" name="email" v-validate:email="'required|email'" placeholder="Введите эл. почту" v-model="email">
        <span class="error-default" v-show="errors.has('email')"> {{errors.first('email')}} </span>
      </div>
      <div class="col-12 form-input-wrapper">
        <input class="form-control" v-mask="'+(##)-###-###-##-##'" id="tel" type="tel" v-validate:tel="'required|phoneNumber'" name="tel" placeholder="Введите номер телефона" v-model="tel">
        <span class="error-default" v-show="errors.has('tel')"> {{errors.first('tel')}} </span>
      </div>
      <div class="col-12 form-input-wrapper">
        <textarea class="form-control" type="text" name="comment" placeholder="Добавьте пожелания к заказу, если таковые имеются" v-model="comment"></textarea>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-success">Заказать</button>
      </div>
    </form>
  </section>
</template>
<script>
import axios from "~/plugins/axios";
import storeService from "~/services/storeServices";
import { mask } from "vue-the-mask";

export default {
  directives: {
    mask
  },
  data() {
    return {
      name: "",
      email: "",
      tel: "",
      comment: ""
    };
  },
  computed: {
    bucket() {
      return this.$store.state.bucket;
    },
    products() {
      return this.bucket.map(item => {
        return { id: item.product._id, quantity: item.quantity };
      });
    },
    totalBucketPrice() {
      return this.$store.getters.totalBucketPrice;
    }
  },
  methods: {
    async makeOrder() {
      let valid = await this.$validator.validateAll();
      if (valid) {
        let regExp = new RegExp(/(\(|\)|\+|-)/g);
        this.tel = this.tel.replace(regExp, "");
        await axios.post("/api/orders", {
          name: this.name,
          email: this.email,
          products: this.products,
          tel: this.tel,
          comment: this.comment,
          totalPrice: this.totalBucketPrice
        });
        storeService.removeCookie("mrbucket");
        storeService.cleanBucket(this.$store);
        alert("Заказ оформлен");
      }
    },
    removeItemFromBucket(index) {
      this.$store.commit('removeItemFromBucketByIndex', {index});
      storeService.removeCookie("mrbucket");
      storeService.setCookieBucket(this.$store.state);
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.form-input-wrapper {
  margin-bottom: 20px;
}
.product-item {
  margin-bottom: 10px;
  border: 1px solid black;
  position: relative;
  cursor: pointer;
  &:hover {
    .close-main {
      opacity: 1;
    }
  }
  img {
    height: 50px;
    width: 50px;
    margin-right: 5px;
  }
}
.close-main {
  position: absolute;
  margin: auto;
  top: -10px;
  right: -10px;
  height: 20px;
  width: 20px;
  opacity: 0.5;
  border-radius: 50%;
  border: 2px solid black;
  &:before,
  &:after {
    position: absolute;
    left: 6px;
    content: " ";
    height: 12px;
    width: 4px;
    top: 2px;
    background-color: #333;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
}
</style>
