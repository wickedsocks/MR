<template>
  <bucket-pop-up :product="product" :similarProducts="similarProducts" :page-preview-styling="false"/>
</template>
<script>
import BucketPopUp from "~/components/BucketPopUp.vue";
import storeServices from "~/services/storeServices.js";
import axios from '~/plugins/axios';

export default {
  middleware: 'redirectFromOldUrlToNew',
  async asyncData({ params, store, redirect }) {
    try {
      // let product = store.getters.getProductByUrl(params.id);
      // if (!product) {
        let response = await axios.get(`/api/product?url=${params.id}`);
        console.log('response ', response);
        product = response.data[0];
        storeServices.pushProducts(store, product);
      // }
      const firstCategory = store.getters.getCategoryById(product.categories[0]);
      const similarProducts = await storeServices.getCategoryProducts(firstCategory.url);
      return { product, similarProducts: similarProducts.data};
    } catch (err) {
      redirect(301, "/404.html");
    }
  },
  components: {
    BucketPopUp
  },
  head() {
    return {
      title: `${this.product.title} - купить за ${
        this.product.productProperties[0].price
      } грн. в православном интернет магазине икон, доставка по Харькову, Киеву, Москве`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.product.title} - купить за ${
            this.product.productProperties[0].price
          } грн. в православном интернет магазине икон и православной утвари, доставка по Киеву, Москве, в Россию и Украину -  Михайловские ряды`
        },
        {
          hid: "keywords",
          name: "keywords",
          content: `${this.product.title} - купить за ${
            this.product.productProperties[0].price
          } грн. ${this.categories}`
        }
      ],
      link: [
        {
          rel: "canonical",
          href: `https://www.mykhailovskie-ryadi.com/ikona/${this.product && this.product.canonicalUrl ? this.product.canonicalUrl : this.product.url}`
        }
      ]
    };
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
  mounted() {
    console.log("this products ", this.product);
    console.log("this products ", this.categories);
    console.log("this similar ", this.similarProducts);
  },
  computed: {
    categories() {
      if (this.product) {
        console.log('this product categories ', this.product.categories);
        return this.product.categories
          .map(id => {
            return this.$store.getters.getCategoryById(id).name;
          })
          .join(",");
      } else {
        return "";
      }
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
