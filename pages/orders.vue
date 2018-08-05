<template>
  <section class="container">
    <h3>Заказы</h3>
    <div v-for="(order, index) in orders" :key="index" class="order-wrapper">
      <p>
        <span class="font-weight-bold">Имя:</span> {{order.customer.name}}
        <span class="font-weight-bold">Эл. почта:</span> {{order.customer.email}}
        <span class="font-weight-bold">Телефон:</span> {{order.customer.tel}}
        <span class="font-weight-bold">Пожелания к заказу:</span> {{order.customer.comment}} </p>
      <div class="col-12">
        <div class="product-item" v-for="item in order.products" :key="item._id">
          <img :src="item.product.images[0]" :alt="item.product.title"> {{item.product.title}}
          <span> {{item.quantity}}</span>
        </div>
      </div>
      <p>
        <span class="font-weight-bold">Сумма к оплате:</span> {{order.customer.totalPrice}} грн</p>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    orders() {
      return this.$store.state.orders.map(order => {
        let customer = {
          name: order.name,
          email: order.email,
          tel: order.tel,
          comment: order.comment,
          totalPrice: order.totalPrice
        };
        let products = order.products.map(product => {
          return {
            product: this.$store.getters.getProductById(product.id),
            quantity: product.quantity
          };
        });
        return { customer, products };
      });
    }
  },
  fetch({ store, redirect }) {
    if (!store.state.user || !store.state.user.data.admin) {
      redirect("/");
    }
  }
};
</script>
<style lang="scss" scoped>
.order-wrapper {
  border: 1px solid #a39d9d;
  padding: 5px;
  margin-bottom: 10px;
  p {
    margin-bottom: 5px;
  }
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