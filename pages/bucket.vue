<template>
  <section class="container">
    <div class="row">
      <h3 class="col-12">Корзина</h3>
    </div>
    <div class="row">
      <h5 class="col-12">Заказ</h5>
      <div class="col-12">
        <div class="product-item" v-for="(item, index) in bucket" :key="index">
          <img :src="item.product.images[0]" :alt="item.product.title"> {{item.product.title}}
          <span> {{item.quantity}}</span>
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
import {mask} from 'vue-the-mask';

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
    }
  },
  mounted() {
  }
};
</script>
<style lang="scss" scoped>
.form-input-wrapper {
  margin-bottom: 20px;
}
.product-item {
  margin-bottom: 10px;
  img {
    height: 50px;
    width: 50px;
    margin-right: 5px;
  }
}
</style>
