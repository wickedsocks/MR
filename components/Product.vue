<template>
  <div class="col-lg-3 col-md-4 col-6 product-item">
    <div class="card">
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

      <button
        @click.prevent="showProductPreview(product)"
        class="btn black-button d-none d-sm-block"
      >В корзину</button>
      <nuxt-link :to="`/ikona/${product.url}`" class="d-flex my-link">
        <button class="btn black-button d-block d-sm-none flex-grow-1">В корзину</button>
      </nuxt-link>
    </div>
    <section
      class="pop-up-wrapper d-flex align-items-start"
      :class="{'visibility-visible': productPreview}"
      @click.self="hideProductPreview()"
    >
      <bucket-pop-up
        :product="productPreview"
        :page-preview-styling="true"
        @close-pop-up="hideProductPreview()"
      />
    </section>
  </div>
</template>

<script>
import BucketPopUp from "~/components/BucketPopUp.vue";
export default {
  components: {
    BucketPopUp
  },
  data() {
    return {
      productPreview: ""
    };
  },
  props: ["product"],
  methods: {
    // NOTE: function above was created for refactoring category structure
  //  async solveCategoriesIssue(product) {
  //     if (product && product.manufactureCategory) {
  //       const manufactCat = product.manufactureCategory; // ID
  //       const prodCat = product.productCategory; // ID
  //       const manuName = this.$store.getters.getConcatCategoryById(manufactCat);
  //       const prodName = this.$store.getters.getConcatCategoryById(prodCat);
  //       const newProdCat = this.$store.getters.getCategoriesByName(prodName.name);
  //       const newManuCat = this.$store.getters.getCategoriesByName(manuName.name);
  //       await axios.post('/api/update/categories', {
  //         id: product._id,
  //         categories: [newProdCat._id, newManuCat._id]
  //       });
  //     }
  //   },
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
  object-fit: contain;
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
