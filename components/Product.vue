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
          <h5 class="card-title">{{product.title| limitTo(80)}}...</h5>
          <!-- <p class="card-text card-description d-none d-sm-block">{{product.description | limitTo(50)}}...</p> -->
          <p class="card-text card-price">{{product.productProperties[0].price}} грн</p>
    

        </div>
      </nuxt-link>
      <button
        @click.prevent="addToBucket(product, 1, 0, 0); showPreview();"
        class="btn black-button d-none d-sm-block"
      >В корзину</button>
    </div>
    <bucket-preview @close-preview="hideBucketPreview()" v-if="showBucketPreviewFlag"></bucket-preview>
  </div>
</template>

<script>
import BucketPopUp from "~/components/BucketPopUp.vue";
import BucketPreview from "~/components/BucketPreview.vue";
export default {
  components: {
    BucketPopUp,
    BucketPreview
  },
  data() {
    return {
      showBucketPreviewFlag: false
    };
  },
  props: ["product"],
  methods: {
    showPreview() {
      this.showBucketPreviewFlag = true;
    },
    hideBucketPreview() {
      this.showBucketPreviewFlag = false;
    },
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
  addToBucket(product, quantity, sizeIndex, colorIndex) {
      this.$store.commit("addNewBucketItem", {
        product,
        quantity,
        sizeIndex,
        colorIndex
      });
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
