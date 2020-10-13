<template>
  <div class="col-lg-3 col-md-4 col-6 product-item">
    <div class="card">
      <nuxt-link
        :to="`/ikona/${product.url}`"
        class="d-flex flex-column card-product-link"
      >
        <img
          class="card-img-top"
          v-if="product.images && product.images.length > 0"
          :src="product.images[0]"
          :alt="product.title"
        />
        <div class="card-body">
          <h5 class="card-title">{{ product.title | limitTo(50) }}...</h5>
          <div class="card-description">
            <p class="card-text">
              Ширина: {{ product.productProperties[0].width }} мм<br />
              Высота: {{ product.productProperties[0].height }} мм
            </p>
            <p class="card-text card-price">
              {{ product.productProperties[0].price }} грн
            </p>
          </div>
        </div>
      </nuxt-link>
      <button
        v-if="!product.inBucket"
        @click.prevent="addToBucket(product, 1, 0, 0)"
        class="btn black-button"
      >
        В корзину
      </button>
      <nuxt-link
        v-if="product.inBucket"
        to="/bucket"
        class="underline-none d-flex"
      >
        <button class="btn purple-button w-100">Уже в корзине</button>
      </nuxt-link>
    </div>
    <bucket-preview
      @close-preview="hideBucketPreview()"
      v-if="showBucketPreviewFlag"
    ></bucket-preview>
  </div>
</template>

<script>
import BucketPopUp from '~/components/BucketPopUp.vue';
import BucketPreview from '~/components/BucketPreview.vue';
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
  props: ['product'],
  methods: {
    showPreview() {
      this.showBucketPreviewFlag = true;
    },
    hideBucketPreview() {
      this.showBucketPreviewFlag = false;
    },
    addToBucket(product, quantity, sizeIndex, colorIndex) {
      this.$store.commit('addNewBucketItem', {
        product,
        quantity,
        sizeIndex,
        colorIndex
      });
      this.$forceUpdate();
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

.card {
  button {
    margin: 0 10px 10px;
  }
}

.card-title {
  font-size: 15px;
  font-weight: normal;
}

.card-price {
  font-size: 18px;
  font-weight: 500;
}

.card-product-link {
  height: 100%;
}
</style>
