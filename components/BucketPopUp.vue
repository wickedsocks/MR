<template>
  <div class="container container-margins" v-if="product">
    <div class="bg0 product-wrapper" :class="{'px-5 py-5':pagePreviewStyling}">
      <breadcrumbs :links="links"></breadcrumbs>
      <button
        class="close-button hov3 trans-04 position-absolute"
        @click="hidePopUp()"
        v-if="pagePreviewStyling"
      >
        <i class="zmdi zmdi-close"></i>
      </button>
      <div class="row" itemscope itemtype="http://schema.org/Product">
        <div class="col-md-6 col-lg-7 p-b-30 row no-gutters d-flex justify-content-center" itemprop="aggregateRating" content='User rating' >
          <div v-swiper:mySwiper="swiperOption" class="overflow-hidden d-block d-md-none" itemprop="ratingCount" content='20'>
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(image, index) in product.images" :key="index">
                <img :src="image" itemprop="image" />
              </div>
            </div>
          </div>
          <div class="col-2 d-none d-md-block" itemprop="review" content='User reviews'>
            <ul>
              <li
                class="d-flex justify-content-center mb-3 pointer sidebar-img-wrapper"
                @click="setCurrentImage(index)"
                v-for="(image, index) in product.images"
                :key="index"
              >
                <img
                  :src="image"
                  :alt="product.title | limitTo(5)"
                  :class="{'select-image-border-color': index == photoIndex}"
                />
              </li>
            </ul>
          </div>
          <div class="swiper-container-horizontal" itemprop="author" :content='product.title'>
            <div class="swiper-pagination d-block d-md-none"></div>
          </div>
          <div class="col-10" itemprop="ratingValue" content='5'>
            <div class="image-wrapper d-none d-md-block">
              <div
                v-for="(image, index) in product.images"
                :key="index"
                v-if="index == photoIndex"
                class="magnify-wrapper"
              >
                <magnifier
                  handler="handler"
                  :url="image"
                  :scale="3"
                  v-if="index == photoIndex && !pagePreviewStyling"
                ></magnifier>
                <img
                  class="image-main"
                  :src="image"
                  itemprop="image"
                  :alt="product.description"
                  :title="product.title"
                  v-if="pagePreviewStyling"
                />
              </div>
            </div>
            <p class="product-description cl3 pt-4 d-none d-md-block">
              <span class="font-weight-bold">Описание:</span>
              <span itemprop="description">{{product.description}}</span>
            </p>
          </div>
        </div>
        <meta itemprop="name" :content="product.title" />
        <meta itemprop="brand" content="MykhailovskieRyadi" />
        <meta itemprop="sku" :content="product._id" />
        <div class="col-md-6 col-lg-5 p-b-30 overflow-hidden">
          <div id="handler" style="position: absolute;display:none;height: 100%;width: 100%;"></div>
          <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
            <h1 class="p-b-14 product-title" itemprop="name">{{product.title}}</h1>
            <link itemprop="availability" href="http://schema.org/InStock" />
            <span class="product-price cl2">
              <span itemprop="price" :content='product.productProperties[sizeIndex].price'>Цена: {{product.productProperties[sizeIndex].price}}</span>
              <meta itemprop="priceCurrency" content="UAH" /> грн
            </span>
            <meta itemprop="priceValidUntil" content="2022-01-21" />
            <meta
              itemprop="url"
              :content="`https://www.mykhailovskie-ryadi.com/ikona/${product.url}`"
            />
            <div class="p-t-33">
              <div class="flex-w flex-r-m p-b-10">
                <div class="size-203 flex-c-m respon6 font-weight-bold">Размер</div>

                <div class="size-204 respon6-next">
                  <div>
                    <select
                      class="custom-select pointer"
                      name="size"
                      @change="sizeSelectOnChange($event)"
                    >
                      <option
                        :value="{height: item.height, width: item.width}"
                        v-for="(item, index) in product.productProperties"
                        :key="index"
                      >{{item.width}} x {{item.height}} см</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="flex-w flex-r-m p-b-10">
                <div class="size-203 flex-c-m respon6 font-weight-bold">Цвет</div>

                <div class="size-204 respon6-next">
                  <div>
                    <select
                      class="custom-select pointer"
                      name="color"
                      @change="colorSelectOnChange($event)"
                    >
                      <option
                        :value="color"
                        v-for="(color, index) in product.color"
                        :key="index"
                      >{{color}}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-w flex-r-m p-b-10">
              <div class="size-204 flex-w flex-m respon6-next">
                <div class="wrap-num-product align-self-start d-flex m-r-20">
                  <div
                    class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                    @click="decrease()"
                  >
                    <i class="fs-16 zmdi zmdi-minus"></i>
                  </div>

                  <input
                    class="mtext-104 cl3 txt-center num-product"
                    type="number"
                    name="num-product"
                    v-model="quantity"
                  />

                  <div
                    class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                    @click="increase()"
                  >
                    <i class="fs-16 zmdi zmdi-plus"></i>
                  </div>
                </div>
                <div class="d-flex flex-column">
                  <div class="py-3 total-price default-font-family">
                    <span class="font-weight-bold">Всего:</span>
                    {{price * quantity}} грн
                  </div>
                  <button
                    class="default-font-family font-weight-bold flex-c-m cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 btn-danger"
                    @click="addToBucket(product, quantity, sizeIndex, colorIndex); hidePopUp(); showPreview();"
                  >В КОЗРИНУ</button>
                  <span class="edit-button-placeholder">
                    <nuxt-link
                      :to="editUrl"
                      class="default-font-family font-weight-bold flex-c-m cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 btn-danger mt-3"
                      v-if="currentUser && currentUser.admin"
                    >РЕДАКТИРОВАТЬ</nuxt-link>
                  </span>
                </div>
              </div>
            </div>
            <p class="product-description cl3">
              <span class="font-weight-bold">Категории:</span>
              <span v-for="(link, index) in links"
                  :key="index">
                <nuxt-link
                  class="category-link cl6 hov-cl1"
                  :to="`${link.url}`"
                  itemprop="itemOffered"
                >
                  <span itemprop="name"> {{link.title }}</span>
                </nuxt-link>
                <span v-if="links.length - 1 != index">,</span>
              </span>
            </p>
            <p class="product-description cl3">
              <span class="font-weight-bold">Высота:</span>
              {{product.productProperties[sizeIndex].height}} см
            </p>
            <p class="product-description cl3">
              <span class="font-weight-bold">Ширина:</span>
              {{product.productProperties[sizeIndex].width}} см
            </p>
            <p class="product-description cl3">
              <span class="font-weight-bold">Цвет:</span>
              {{colorModel}}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="similarProducts">
      <h3>Похожие товары</h3>
      <similar-product :products="similarProducts" :currentProduct="product"></similar-product>
    </div>
    <bucket-preview @close-preview="hideBucketPreview()" v-if="showBucketPreviewFlag"></bucket-preview>
  </div>
</template>
<script>
import Magnifier from "~/components/Magnifier.vue";
import Breadcrumbs from "~/components/Breadcrumbs.vue";
import SimilarProduct from "~/components/SimilarProduct.vue";
import BucketPreview from "~/components/BucketPreview.vue";
export default {
  components: {
    Magnifier,
    Breadcrumbs,
    SimilarProduct,
    BucketPreview
  },
  data() {
    return {
      quantity: 1,
      randomData: null,
      photoIndex: 0,
      showBigPopUp: false,
      colorIndex: 0,
      sizeIndex: 0,
      swiperOption: {
        loop: true,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      showBucketPreviewFlag: false
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    editUrl() {
      return `/ikona/edit/${this.$route.params.id}`;
    },
    sizeModel() {
      return this.product.productProperties[this.sizeIndex];
    },
    colorModel() {
      return this.product.color[this.colorIndex];
    },
    price() {
      return this.product.productProperties[this.sizeIndex].price;
    },
    categories() {
      if (this.product) {
        return this.product.categories.map(id => {
          return this.$store.getters.getCategoryById(id);
        });
      } else {
        return "";
      }
    },
    links() {
      if (this.categories) {
        return this.categories.map(cat => {
          return { title: cat.name, url: `/categories/${cat.url}` };
        });
      }
    }
  },
  props: ["product", "pagePreviewStyling", "similarProducts"],
  methods: {
    sizeSelectOnChange(event) {
      this.sizeIndex = event.target.selectedIndex;
    },
    colorSelectOnChange(event) {
      this.colorIndex = event.target.selectedIndex;
    },
    increase() {
      if (!this.quantity) {
        this.quantity = 1;
      } else {
        this.quantity += 1;
      }
    },
    decrease() {
      this.quantity -= 1;
    },
    hidePopUp() {
      this.$emit("close-pop-up");
      this.quantity = 1;
      this.photoIndex = 0;
    },
    addToBucket(product, quantity, sizeIndex, colorIndex) {
      this.$store.commit("addNewBucketItem", {
        product,
        quantity,
        sizeIndex,
        colorIndex
      });
    },
    showPreview() {
      this.showBucketPreviewFlag = true;
    },
    hideBucketPreview() {
      this.showBucketPreviewFlag = false;
    },
    setCurrentImage(index) {
      this.photoIndex = index;
    },
    swipeTest() {
      console.log("test");
    },
    changeImage(number) {
      this.photoIndex += number;
      if (this.photoIndex > this.product.images.length - 1) {
        this.photoIndex = 0;
      } else if (this.photoIndex < 0) {
        this.photoIndex = this.product.images.length - 1;
      }
    },
    toggleBigPopUp() {
      this.showBigPopUp = !this.showBigPopUp;
    }
  },
  mounted() {
    console.log("This is current swiper instance object", this.mySwiper);
    console.log("links", this.product);
    console.log("links", this.categories);
    console.log("links", this.links);
    //  this.mySwiper.slideTo(3)
  }
};
</script>

<style lang="scss" scoped>
.close {
  display: block;
  border: 1px solid black;
  border-radius: 4px;
  padding: 4px;
}

.image {
  display: block;
  margin: 0 auto;
}

.row {
  margin-bottom: 10px;
}

.product-quantity {
  position: absolute;
}

header {
  border-bottom: 1px solid #efefef;
  padding-bottom: 10px;
}

button {
  outline: none;
}

// --------------------------------- new styles

.product-title {
  font-size: 24px;
  font-weight: 500;
  font-family: sans-serif;
  overflow: hidden;
}

.product-price {
  font-size: 18px;
  font-weight: 600;
  font-family: sans-serif;
}

.product-description {
  font-size: 14px;
  word-wrap: break-word;
  transition: height 0.3s;
}
.left,
.right {
  background-color: rgba(0, 0, 0, 0.6);
  height: 40px;
  width: 40px;
  color: #ffffff;
  font-size: 25px;
  text-align: center;
  top: 0;
  bottom: 0;
  margin: auto;
  position: absolute;
  z-index: 1;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
}
.left {
  left: -40px;
}
.right {
  right: -40px;
}
.close-button {
  right: 0;
  top: -50px;
  font-size: 35px;
  color: #ffffff;
}
.close-button-big-preview {
  right: 0;
  top: 0;
  font-size: 35px;
  color: #ffffff;
}
.sidebar-img-wrapper {
  img {
    height: 55px;
    width: 55px;
    border: 2px solid transparent;
    &:hover {
      opacity: 0.6;
      border: 2px solid #717fe0;
    }
  }
  .select-image-border-color {
    border: 2px solid #ccc;
  }
}

.total-price {
  font-size: 16px;
}
.open-preview {
  background-color: #ffffff;
  top: 20px;
  right: 20px;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  font-size: 25px;
  box-shadow: 0 0 3px black;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: #ffffff;
    background-color: #717fe0;
  }
}
.zoom-preview {
  z-index: 1200;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  img {
    width: auto;
    max-width: 100%;
    height: auto;
    display: block;
  }
}
.overlay-fixed {
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.container-margins {
  margin-top: 50px;
}
.overflow-hidden {
  overflow: hidden;
}
.edit-button-placeholder {
  min-height: 61px;
  display: block;
  a:hover {
    text-decoration: none;
  }
}
.swiper-slide {
  img {
    height: auto;
    width: 100%;
  }
}
.swiper-pagination {
  bottom: 10px;
  left: 0;
  right: 0;
  margin: auto;
}
.image-wrapper {
  position: relative;
  height: 400px;
}
.magnify-wrapper {
  height: 100%;
  width: auto;
}
.image-main {
  width: auto;
  height: auto;
  max-height: 400px;
  max-width: 400px;
}
// --------------------------------- new styles end
@media (max-width: 768px) {
  .product-wrapper {
    padding: 0 !important;
  }
}
</style>
