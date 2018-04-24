<template>
  <section class="container">
    <div class="row">
      <h3 class="col-12">Корзина</h3>
    </div>
    <div class="row">
      <h5 class="col-12">Заказ</h5>
      <div class="col-12">
        <div class="product-item" v-for="(order, index) in orders" :key="index">
          <img :src="order.product.images[0]" :alt="order.product.title"> {{order.product.title}}
          <span> {{order.quantity}}</span>
        </div>
        <h5> Сумма к оплате: {{totalOrderPrice}} грн </h5>
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
  computed: {
    orders() {
      return this.$store.state.orders;
    },
    products() {
      return this.orders.map(item => {
        return { id: item.product._id, quantity: item.quantity };
      });
    },
    totalOrderPrice() {
      return this.$store.getters.totalOrderPrice;
    }
  },
  methods: {
    showOrderPreview() {},
    async makeOrder() {
      await axios.post("/api/orders", {
        name: this.name,
        email: this.email,
        products: this.products,
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
