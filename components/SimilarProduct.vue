<template>
  <div class="product-item d-flex">
    <div class="card" v-for="(product, index) in products" :key="index"
    v-if="product._id !== currentProduct._id || index > 4">
      <nuxt-link :to="`/ikona/${product.url}`" class="d-flex flex-column">
        <img
          class="card-img-top"
          v-if="product.images && product.images.length > 0"
          :src="product.images[0]"
          :alt="product.title"
        >
        <div class="card-body">
          <h5 class="card-title">{{product.title | limitTo(15)}}...</h5>
          <p class="card-text d-none d-sm-block">{{product.description | limitTo(30)}}...</p>
          <p class="card-text">{{product.productProperties[0].price}} грн</p>
        </div>
      </nuxt-link>
    </div>
    </div>
</template>

<script>
export default {
  props: ["products", "currentProduct"],
  mounted() {
    console.log('products asdas ', this.products);
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
  object-fit: contain;
}

.card-body {
  padding: 10px;
}

.card {
  max-width: 200px;
  & + .card {
    margin-left: 10px;
  }
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
