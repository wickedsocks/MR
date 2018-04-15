<template>
  <section class="container">
    <div class="row">
      <h5 class="col-12">
        {{product.title}}
      </h5>
    </div>
    <div class="row">
      <div class="col-xs-12 col-md-6 col-lg-6">
        <img class="main-image" :src="product.images[0]" :alt="product.title">
      </div>
      <div class="col-xs-12 col-md-6 col-lg-6">
        <p> {{product.description}} </p>
        <p> Цена: {{product.price}} грн </p>
        <p> Изготовлено из: {{product.manufactureCategory}} </p>
        <p> Икона такого-то святого {{product.productCategory}} </p>
        <p> Ширина {{product.width}} см </p>
        <p> Высота {{product.height}} см </p>
      </div>
    </div>
    <!-- {{product}} -->
  </section>
</template>
<script>
export default {
  async asyncData({ params, store }) {
    return { product: store.getters.getSpecifiedProduct(params.id) };
  },
  data() {
    return {
      product: ""
    };
  }
};
</script>
<style lang="scss" scoped>
.main-image {
  max-height: 300px;
}
</style>
