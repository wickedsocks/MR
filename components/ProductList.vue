<template>
   <!-- Page Content -->
    <section class="container">
      <!-- Page Heading -->
      <h3 class="my-4">Каталог товара
        <small>провославной продукции</small>
      </h3>

      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6 product-item" v-for="product in products" :key="product._id">
          <div class="card">
            <img class="card-img-top" v-if="product.images && product.images.length > 0" :src="product.images[0]" :alt="product.title">
            <div class="card-body">
              <h5 class="card-title"> {{product.title}} </h5>
              <p class="card-text" v-if="product.description && product.description.length > 70"> {{product.description | limitTo(70)}}... </p>
              <p class="card-text" v-if="product.description && product.description.length <= 70"> {{product.description}} </p>
              <button @click="showProductPreview(product)" class="btn btn-primary">Купить</button>
            </div>
        </div>
      </div>
      </div>
    <bucket-pop-up v-if="productPreview" :product="productPreview" @close-pop-up="hideProductPreview()"/>
    </section> 
</template>

<script>
import BucketPopUp from "~/components/BucketPopUp.vue";
export default {  
  data() {
    return {
      productPreview: ''
    }
  },
  components: {
    BucketPopUp
  },
  props: ["products"],
  methods: {
    hideProductPreview() {
      this.productPreview = '';
    },
    showProductPreview(product) {
      this.productPreview = product;
    }
  }
};
</script>


<style lang="scss" scoped>
.product-item {
  padding-bottom: 20px;
}
.card {
  img {
    height: 180px;
    width: auto;
    object-fit: cover;
  }
}
</style>
