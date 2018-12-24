<template>
  <div class="container container-margins" v-if="product">
    <div class="bg0 py-5 px-5 how-pos3-parent">
      <button
        class="close-button hov3 trans-04 position-absolute"
        @click="hidePopUp()"
        v-if="pagePreviewStyling"
      >
        <i class="zmdi zmdi-close"></i>
      </button>
      <div class="row">
        <div class="col-md-6 col-lg-7 p-b-30 row no-gutters d-flex justify-content-center">
          <div v-swiper:mySwiper="swiperOption" class="overflow-hidden">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(image, index) in product.images" :key="index">
                <img :src="image">
              </div>
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-prev d-none d-md-block" slot="button-prev"></div>
            <div class="swiper-button-next d-none d-md-block" slot="button-next"></div>
          </div>
          <div class="col-10">
            <p class="product-description cl3 pt-4 d-none d-md-block">{{product.description}}</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-5 p-b-30 overflow-hidden">
          <div>
            <h4 class="p-b-14 product-title">{{product.title}}</h4>

            <span class="product-price cl2">{{product.productProperties[sizeIndex].price}} грн</span>
            <div class="p-t-33">
              <div class="flex-w flex-r-m p-b-10">
                <div class="size-203 flex-c-m respon6">Размер</div>

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
                <div class="size-203 flex-c-m respon6">Цвет</div>

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
                <div class="wrap-num-product align-self-end d-flex m-r-20">
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
                  >

                  <div
                    class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                    @click="increase()"
                  >
                    <i class="fs-16 zmdi zmdi-plus"></i>
                  </div>
                </div>
                <div class="d-flex flex-column">
                  <div class="py-3 total-price default-font-family">Всего: {{price * quantity}} грн</div>
                  <button
                    class="default-font-family font-weight-bold flex-c-m cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04"
                    @click="addToBucket(product, quantity, sizeIndex, colorIndex); hidePopUp()"
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
              Категории:
              <span v-for="(cat, index) in categories" :key="index">
                {{cat.name}}
                <span v-if="index !== categories.length - 1">,</span>
              </span>
            </p>
            <p
              class="product-description cl3"
            >Высота: {{product.productProperties[sizeIndex].height}} см</p>
            <p
              class="product-description cl3"
            >Ширина: {{product.productProperties[sizeIndex].width}} см</p>
            <p class="product-description cl3">Цвет: {{colorModel}}</p>
          </div>
        </div>
      </div>
    </div>
    <zoom-product
      :photo-index="photoIndex"
      @change-image="changeImage($event)"
      @close-big-popup="toggleBigPopUp()"
      :photo-amount="product.images.length"
      :src="product.images[photoIndex]"
      v-if="product && showBigPopUp"
    />
  </div>
</template>
<script>
import ZoomProduct from "~/components/ZoomProduct.vue";
export default {
  components: {
    ZoomProduct
  },
  data() {
    return {
      quantity: 1,
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
      }
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
    }
  },
  props: ["product", "pagePreviewStyling"],
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
    console.log(
      "This is current swiper instance object",
      this.mySwiper
    );
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
.main-img-wrapper {
  height: 100%;
  display: flex;
  width: 100%;
  max-height: 400px;
  align-items: center;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
}

.product-title {
  font-size: 24px;
  font-weight: 500;
  font-family: sans-serif;
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
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
}
.left {
  left: 0;
}
.right {
  right: 0;
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
@media (max-width: 768px) {
  .main-img-wrapper {
    height: auto;
  }
}
// --------------------------------- new styles end
</style>
