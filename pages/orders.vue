<template>
  <section class="container">
    <h3>Заказы</h3>
    <p>Заказы {{orders}} </p>
  </section>
</template>

<script>
// customer: {
//             name: order.name,
//             email: order.email,
//             tel: order.tel,
//             comment: order.comment
//           }
export default {
  computed: {
    orders() {
      return this.$store.state.orders.map(order => {
        return order.products.map(product => {
          return this.$store.getters.getProductById(product.id);
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>

</style>