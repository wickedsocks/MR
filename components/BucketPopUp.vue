<template>
  <div>
    <section class="pop-up-wrapper d-flex align-items-center" :class="{'visibility-visible': product}" @click.self="hidePopUp()">
      <div class="container" v-if="product">
        <div class="bg0 p-t-60 p-b-30 p-lr-15-lg how-pos3-parent">
          <button class="close-button hov3 trans-04 position-absolute" @click="hidePopUp()">
            <i class="zmdi zmdi-close"></i>
          </button>

          <div class="row">
            <div class="col-md-6 col-lg-7 p-b-30 row no-gutters">
              <div class="col-2">
                <ul>
                  <li class="d-flex justify-content-center mb-3 pointer sidebar-img-wrapper" @click="setCurrentImage(index)" v-for="(image, index) in product.images" :key="index">
                    <img :src="image" :alt="product.description" :class="{'select-image-border-color': index == photoIndex}">
                  </li>
                </ul>
              </div>
              <div class="col-10">
                <div class="main-img-wrapper position-relative">
                  <img :src="product.images[photoIndex]" :alt="product.description">
                  <div class="open-preview position-absolute d-flex align-items-center justify-content-center pointer" @click="toggleBigPopUp()">
                    <i class="zmdi zmdi-swap"></i>
                  </div>
                  <div class="left position-absolute pointer" @click="changeImage(-1)">
                    <i class="zmdi zmdi-chevron-left"></i>
                  </div>
                  <div class="right position-absolute pointer" @click="changeImage(1)">
                    <i class="zmdi zmdi-chevron-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-5 p-b-30">
              <div class="p-r-50 p-t-5 p-lr-0-lg">
                <h4 class="p-b-14 product-title">
                  {{product.title}}
                </h4>

                <span class="product-price cl2">
                  {{product.price}} грн
                </span>

                <p class="product-description cl3 p-t-23">
                  {{product.description}}
                </p>

                <!--  -->
                <div class="p-t-33">
                  <div class="flex-w flex-r-m p-b-10">
                    <div class="size-203 flex-c-m respon6">
                      Size
                    </div>

                    <div class="size-204 respon6-next">
                      <div>
                        <select class="custom-select pointer" name="time">
                          <option>Choose an option</option>
                          <option>Size S</option>
                          <option>Size M</option>
                          <option>Size L</option>
                          <option>Size XL</option>
                        </select>
                        <div class="dropDownSelect2"></div>
                      </div>
                    </div>
                  </div>

                  <div class="flex-w flex-r-m p-b-10">
                    <div class="size-203 flex-c-m respon6">
                      Color
                    </div>

                    <div class="size-204 respon6-next">
                      <div>
                        <select class="custom-select pointer" name="time">
                          <option>Choose an option</option>
                          <option>Red</option>
                          <option>Blue</option>
                          <option>White</option>
                          <option>Grey</option>
                        </select>
                        <div class="dropDownSelect2"></div>
                      </div>
                    </div>
                  </div>

                  <div class="flex-w flex-r-m p-b-10">
                    <div class="size-204 flex-w flex-m respon6-next">
                      <div class="wrap-num-product flex-w m-r-20 m-tb-10">
                        <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m" @click="decrease()">
                          <i class="fs-16 zmdi zmdi-minus"></i>
                        </div>

                        <input class="mtext-104 cl3 txt-center num-product" type="number" name="num-product" v-model="quantity">

                        <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m" @click="increase()">
                          <i class="fs-16 zmdi zmdi-plus"></i>
                        </div>
                      </div>
                      <div class="py-3 total-price default-font-family">
                        Всего: {{product.price * quantity}} грн
                      </div>
                      <button class="default-font-family font-weight-bold flex-c-m cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04" @click="addToBucket(product, quantity); hidePopUp()">
                        В КОЗРИНУ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="container form-control" v-if="product">
      <div class="row no-gutters">
        <header class="col-12 d-flex justify-content-between align-items-center">
          {{product.title}}
          <span class="close" @click="hidePopUp()">X</span>
        </header>
      </div>
      <div class="row no-gutters">
        <div class="col-12 col-md-4">
          <img :src="product.images[0]" :alt="product.title" class="img-fluid image">
        </div>
        <div class="col-12 col-md-7 description">
          <p>
            <span class="font-weight-bold">Наименование: </span>{{product.title}}
          </p>
          <p>
            <span class="font-weight-bold">Описание: </span>{{product.description}}
          </p>
          <p>
            <span class="font-weight-bold">Категория: </span>{{productCategory}}<br>
            <span class="font-weight-bold">Изготовлено из: </span>{{manufactureCategory}}<br>
            <span class="font-weight-bold">Ширина: </span>{{product.width}} см <br>
            <span class="font-weight-bold">Высота: </span>{{product.height}} см
          </p>
          <p>
            <span class="font-weight-bold">Цена: </span>{{product.price}} грн
          </p>
        </div>
      </div>
      <div class="row no-gutters counter justify-content-between">
        <span class="font-weight-bold col-12">Количество:</span>
        <div class="col-12 col-md-6 d-flex justify-content-between flex-wrap">
          <input type="number" class="form-control col-12" v-model="quantity">
          <button class="btn btn-success col-5" @click="decrease()">-</button>
          <button class="btn btn-success col-5" @click="increase()">+</button>
        </div>
        <div class="col-12 col-md-5">
          <p class="col-12 total-price">
            <span class="font-weight-bold">Общая стоимость: </span>{{product.price * quantity}} грн
          </p>
          <button class="btn btn-success col-12" @click="addToBucket(product, quantity); hidePopUp()">Купить</button>
        </div>
      </div>
    </div> -->
    </section>
  <zoom-product :photo-index="photoIndex" @change-image="changeImage($event)" @close-big-popup="toggleBigPopUp()" :photo-amount="product.images.length" :src="product.images[photoIndex]" v-if="product && showBigPopUp"/>
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
      showBigPopUp: false
    };
  },
  computed: {
    productCategory() {
      return this.$store.getters.getCategoryById(this.product.productCategory)
        .name;
    },
    manufactureCategory() {
      return this.$store.getters.getCategoryById(
        this.product.manufactureCategory
      ).name;
    }
  },
  props: ["product"],
  methods: {
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
      document.removeEventListener("keyup", this.closeWithEsc);
    },
    addToBucket(product, quantity) {
      this.$store.commit("addNewBucketItem", { product, quantity });
    },
    closeWithEsc(event) {
      if (event.keyCode == 27) {
        this.hidePopUp();
      }
    },
    setCurrentImage(index) {
      this.photoIndex = index;
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
    document.addEventListener("keyup", this.closeWithEsc);
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

.description {
  margin-top: 10px;
}

.counter {
  input {
    padding: 6px 12px;
  }
  button {
    margin-top: 10px;
  }
}

.visibility-visible {
  visibility: visible;
  background-color: rgba(0, 0, 0, 0.6);
}
// --------------------------------- new styles
.main-img-wrapper {
  img {
    height: auto;
    width: 100%;
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
  transition: all 0.3s ease-in-out;
  &:hover {
    color: #ffffff;
    background-color: #717fe0;
  }
  .zmdi {
    transform: rotate(-45deg);
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
// --------------------------------- new styles end
@media screen and (min-width: 720px) {
  .description {
    margin-left: 10px;
    margin-top: 0;
  }
  .image {
    margin-top: 7px;
  }
}
</style>
