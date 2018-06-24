<template>
  <!-- Page Content -->
  <section class="container">
    <!-- Page Heading -->
    <h3 class="my-4">Каталог товара
      <small>продукции</small>
    </h3>

    <div class="row">
      <div class="col-lg-3 col-md-4 col-6 product-item" v-for="product in products" :key="product._id">
        <div class="card">
          <nuxt-link :to="'/product/'+ product._id" class="d-flex flex-column">
            <img class="card-img-top" v-if="product.images && product.images.length > 0" :src="product.images[0]" :alt="product.title">
            <div class="card-body">
              <h5 class="card-title"> {{product.title | limitTo(15)}}... </h5>
              <p class="card-text d-none d-sm-block"> {{product.description | limitTo(30)}}... </p>
              <p class="card-text"> {{product.price}} грн </p>
            </div>
          </nuxt-link>

          <button @click.prevent="showProductPreview(product)" class="btn black-button d-none d-sm-block">В корзину</button>
          <nuxt-link :to="`/product/${product._id}`" class="d-flex my-link">
            <button class="btn black-button d-block d-sm-none flex-grow-1">В корзину</button>
          </nuxt-link>
        </div>
      </div>
    </div>
    <section class="pop-up-wrapper d-flex align-items-start" :class="{'visibility-visible': productPreview}" @click.self="hideProductPreview()">
      <bucket-pop-up :product="productPreview" :page-preview-styling='true' @close-pop-up="hideProductPreview()" />
    </section>
  </section>
</template>

<script>
import BucketPopUp from "~/components/BucketPopUp.vue";
export default {
  data() {
    return {
      productPreview: ""
    };
  },
  components: {
    BucketPopUp
  },
  props: ["products"],
  methods: {
    hideProductPreview() {
      this.productPreview = "";
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
.card-img-top {
  height: 180px;
  width: auto;
  object-fit: cover;
}

.card-body {
  padding: 10px;
}

.card {
  button {
    margin: 0 10px 10px;
  }
}

.pop-up-wrapper {
  padding: 20px 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1100;
  background-color: transparent;
  overflow-x: hidden;
  overflow-y: scroll;
  visibility: hidden;
  transition: background-color 0.3s ease-in-out;
}

.visibility-visible {
  visibility: visible;
  background-color: rgba(0, 0, 0, 0.6);
}
.my-link {
  text-decoration: none;
  cursor: auto;
}
</style>
