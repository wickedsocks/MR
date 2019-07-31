<template>
  <div class="product-item">
    <div class="card" v-for="(product, index) in products" :key="index"
    v-if="product._id !== currentProduct._id">
      <nuxt-link :to="`/ikona/${product.url}`" class="d-flex flex-column">
        <img
          class="card-img-top"
          v-if="product.images && product.images.length > 0"
          :src="product.images[0]"
          :alt="product.title"
        >
        <div class="card-body">
          <h5 class="card-title" >{{product.title| limitTo(80)}}...</h5>
          <!-- <p class="card-text d-none d-sm-block">{{product.description | limitTo(30)}}...</p> -->
          <p class="card-text card-price">{{product.productProperties[0].price}} грн</p>
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
  overflow-y: hidden;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: block;
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #6d6d6d;
    border-radius: 25px;
    display: block;
    height: 6px;
  }
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
  width: 175px;
  & + .card {
    margin-left: 10px;
  }
  button {
    margin: 0 10px 10px;
  }
}

.my-link {
  text-decoration: none;
  cursor: auto;
}

.card-title {
  font-size: 15px;
  font-weight: normal;
}

.card-description {
  font-size: 13px;
}

.card-price {
  font-size: 18px;
  font-weight: 500;
}
</style>
