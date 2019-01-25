<template>
  <section
    class="pop-up-wrapper d-flex align-items-start visibility-visible"
    @click.self="hideProductPreview()"
  >
    <div class="container bg0 product-wrapper px-5 py-5">
      <div class="container" v-if="bucket.length > 0">
        <div class="row">
          <div class="col-12 d-flex justify-content-between">
            <h2>Вы добавили товар в корзину</h2>
            <span
              class="close hov3 trans-04 d-flex align-items-center justify-content-center"
              @click="hideProductPreview()"
            >
              <i class="zmdi zmdi-close"></i>
            </span>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-lg-8">
            <div class="table-responsive border-gray-default">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Название</th>
                    <th scope="col">Цена</th>
                    <th scope="col">Количество</th>
                    <th scope="col">Всего</th>
                    <th scope="col">Удалить</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="vertical-align-child-center"
                    v-for="(item, index) in bucket"
                    :key="index"
                  >
                    <th scope="row">
                      <nuxt-link :to="'/ikona/'+ item.product.url" class="purple-hover">
                        <div class="d-flex align-items-center justify-content-start">
                          <img
                            :src="item.product.images[0]"
                            class="product-image pr-2"
                            :alt="item.product.title"
                          >
                          <span class="bucket-product-name">{{item.product.title}}</span>
                        </div>
                      </nuxt-link>
                      <!-- <div
                        class="size"
                      >Размер: {{item.product.productProperties[item.sizeIndex].height}} x {{item.product.productProperties[item.sizeIndex].width}} см</div>
                      <div class="color">Цвет: {{item.product.color[item.colorIndex]}}</div>-->
                    </th>
                    <td>{{item.product.productProperties[item.sizeIndex].price}} грн</td>
                    <td>
                      <div class="wrap-num-product my-1 flex-nowrap d-flex">
                        <div
                          class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                          @click="decrease(item)"
                        >
                          <i class="fs-16 zmdi zmdi-minus"></i>
                        </div>
                        <input
                          class="mtext-104 cl3 txt-center num-product"
                          :value="item.quantity"
                          type="number"
                          name="num-product"
                          @input="onInput($event, item)"
                        >
                        <div
                          class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                          @click="increase(item)"
                        >
                          <i class="fs-16 zmdi zmdi-plus"></i>
                        </div>
                      </div>
                    </td>
                    <td>{{item.product.productProperties[item.sizeIndex].price * item.quantity}} грн</td>
                    <td
                      @click="removeItemFromBucket(index)"
                      class="pointer delete-button purple-hover"
                    >Удалить</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <div class="main-border p-4">
              <h4 class="mtext-109 font-weight-bold">Всего</h4>

              <div class="flex-w flex-t p-b-13 align-items-center">
                <div class="size-208">
                  <span class="stext-110 cl2 total">Итого:</span>
                </div>

                <div class="size-209">
                  <span class="mtext-110 cl2">{{totalBucketPrice}} грн</span>
                </div>
              </div>
              <button
                class="font-weight-bold flex-c-m cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer my-btn mb-4"
                @click="hideProductPreview()"
              >Продолжить покупки</button>
              <nuxt-link
                class="font-weight-bold flex-c-m cl0 size-116 bg1 bor1 hov-btn1 p-lr-15 trans-04"
                to="/bucket"
              >Оформить заказ</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import storeService from "~/services/storeServices";
export default {
  computed: {
    bucket() {
      return this.$store.state.bucket;
    },
    products() {
      return this.bucket.map(item => {
        console.log("item ", item);
        return {
          url: item.product.url,
          id: item.product._id,
          colorIndex: item.colorIndex,
          sizeIndex: item.sizeIndex,
          quantity: item.quantity
        };
      });
    },
    totalBucketPrice() {
      return this.$store.getters.totalBucketPrice;
    }
  },
  data() {
    return {};
  },
  methods: {
    increase(item) {
      this.$store.commit("icreaseBucketItemQuantity", { item, amount: 1 });
    },
    decrease(item) {
      this.$store.commit("decreaseBucketItemQuantity", { item, amount: 1 });
    },
    hideProductPreview() {
      this.$emit("close-preview");
    },
    removeItemFromBucket(index) {
      this.$store.commit("removeItemFromBucketByIndex", { index });
      storeService.removeLocalStorageBucket("mrbucket");
      storeService.setLocalStorageBucket(this.$store.state);
      if (this.bucket && this.bucket.length == 0) {
        this.hideProductPreview();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
button,
div,
h4,
span,
input,
p {
  font-family: sans-serif;
  color: #555;
}
.main-border {
  border: 1px solid #e6e6e6;
}
.product-image {
  max-width: 120px;
  max-height: 120px;
}
.vertical-align-child-center {
  td {
    vertical-align: middle;
  }
}
tr {
  border: 1px solid #e6e6e6;
}
.delete-button {
  &:hover {
    text-decoration: underline;
  }
}
.my-btn {
  color: #ffffff;
  outline: none;
}
.error-default {
  color: red;
  font-size: 12px;
}
.purple-hover {
  &:hover {
    div {
      color: #717fe0;
    }
  }
}
.no-orders {
  height: 150px;
  align-items: center;
  text-align: center;
  line-height: 150px;
}
.size,
.color {
  font-weight: normal;
  margin-left: 60px;
}
.table {
  margin-bottom: 0;
}
a {
  &:hover {
    text-decoration: none;
  }
}
.table-responsive {
  max-height: calc(100vh - 130px);
  overflow-y: scroll;
}
.close {
  font-size: 40px;
  height: 40px;
  width: 40px;
}
.total {
  font-size: 20px;
}
</style>


