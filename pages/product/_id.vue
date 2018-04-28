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
        <p> Изготовлено из: {{manufactureCategory}} </p>
        <p> Икона такого-то святого {{productCategory}} </p>
        <p> Ширина {{product.width}} см </p>
        <p> Высота {{product.height}} см </p>
        <button @click.prevent="showProductPreview(product)" class="btn btn-primary">Купить</button>
      </div>
      <bucket-pop-up v-if="productPreview" :product="productPreview" @close-pop-up="hideProductPreview()" />
    </div>
  </section>
</template>
<script>
import BucketPopUp from "~/components/BucketPopUp.vue";
export default {
  async asyncData({ params, store }) {
    return { product: store.getters.getProductById(params.id) };
  },
  components: {
    BucketPopUp
  },
  data() {
    return {
      product: "",
      productPreview: ""
    };
  },
  methods: {
    hideProductPreview() {
      this.productPreview = "";
    },
    showProductPreview(product) {
      this.productPreview = product;
    }
  },
  computed: {
    productCategory() {
      return this.$store.getters.getCategoryById(this.product.productCategory)
        .name;
    },
    manufactureCategory() {
      return this.$store.getters.getCategoryById(
        this.product.manufactureCategory
      ).name;
    }
  }
};
</script>
<style lang="scss" scoped>
.main-image {
  max-height: 300px;
  width: 100%;
  height: auto;
}
</style>
