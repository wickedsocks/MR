<template>
  <section class="container">
    <div class="row">
      <h3 class="col-12">Корзина</h3>
    </div>
    <div class="row">
      <h5 class="col-12">Заказ</h5>
      <div class="col-12">
        <div class="product-item" v-for="(product, index) in orders" :key="index">
          <img :src="product.images[0]" :alt="product.title">
          {{product.title}}
          <!-- {{product}} -->
        </div>
      </div>
    </div>
    <form class="row" novalidate @submit.prevent="makeOrder">
      <div class="col-12 form-input-wrapper">
        <input class="form-control" type="text" name="name" placeholder="Введите имя и фамилию" v-model="name">
      </div>
      <div class="col-12 form-input-wrapper">
        <input class="form-control" type="text" name="email" placeholder="Введите эл. почту" v-model="email">
      </div>
      <div class="col-12 form-input-wrapper">
        <input class="form-control" type="number" name="tel" placeholder="Введите номер телефона" v-model="tel">
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
import { mapState } from "vuex";
import axios from "~/plugins/axios";
export default {
  data() {
    return {
      name: "",
      email: "",
      tel: null,
      comment: ""
    };
  },
  computed: mapState(["orders"]),
  methods: {
    async makeOrder() {
      await axios.post("/api/orders", {
        name: this.name,
        email: this.email,
        tel: this.tel,
        comment: this.comment
      });
      alert("Заказ оформлен");
    }
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
