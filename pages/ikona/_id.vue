<template>
  <bucket-pop-up :product="product" :page-preview-styling="false"/>
</template>
<script>
import BucketPopUp from "~/components/BucketPopUp.vue";
export default {
  async asyncData({ params, store, redirect }) {
    try {
      const product = store.getters.getProductByUrl(params.id);
      if (!product) {
        throw new Error("Страница не найдена");
      }
      return { product };
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
      } грн. в православном интернет магазине икон, доставка по Киеву, Москве, в Россию и Украину -  Михайловские ряды`,
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
  },
  computed: {
    categories() {
      if (this.product) {
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
