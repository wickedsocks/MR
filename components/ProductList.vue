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
              <p class="card-text"> {{product.description | limitTo(70)}}... </p>
              <a href="#" class="btn btn-primary">Купить</a>
            </div>
        </div>
      </div>
      </div>
    </section> 
</template>

<script>
export default {
  props: ["products"]
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
