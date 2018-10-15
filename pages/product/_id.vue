<template>
  <bucket-pop-up :product="product" :page-preview-styling="false" />
</template>
<script>
import BucketPopUp from '~/components/BucketPopUp.vue';
export default {
  async asyncData({ params, store }) {
    return { product: store.getters.getProductByUrl(params.id) };
  },
  components: {
    BucketPopUp
  },
  data() {
    return {
      product: '',
      productPreview: ''
    };
  },
  methods: {
    hideProductPreview() {
      this.productPreview = '';
    },
    showProductPreview(product) {
      this.productPreview = product;
    }
  },
  mounted() {
    console.log('this products ', this.product);
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
