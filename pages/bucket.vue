<template>
  <div>
    <div v-if="bucket.length == 0">
      <h4 class="no-orders">Ваш заказ не содержит товаров</h4>
    </div>
    <form novalidate @submit.prevent="makeOrder">
      <div class="container" v-if="bucket.length > 0">
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
                      <!-- <div class="size">Размер: {{item.product.productProperties[item.sizeIndex].height}} x {{item.product.productProperties[item.sizeIndex].width}} см</div> -->
                      <!-- <div class="color">Цвет: {{item.product.color[item.colorIndex]}}</div> -->
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

              <div class="flex-w flex-t bor12 p-b-13">
                <div class="size-208">
                  <span class="stext-110 cl2">Итого:</span>
                </div>

                <div class="size-209">
                  <span class="mtext-110 cl2">{{totalBucketPrice}} грн</span>
                </div>
              </div>

              <div class="flex-w flex-t bor12 p-t-15">
                <div class="p-r-0-sm w-full-ssm">
                  <!-- TODO: place for message maybe for delivery options -->
                  <!-- <p class="stext-111 cl6 p-t-2"> -->
                  <!-- При заказе от такой то суммы доставка бесплатная Самовывоз оттуда Дни доставки такие то -->
                  <!-- </p> -->
                  <div class="p-t-15">
                    <span class="stext-112 cl8">Оформить заказ</span>

                    <div class="bg0 m-b-12">
                      <input
                        class="stext-111 bor8 cl8 plh3 size-111 p-lr-15"
                        type="text"
                        v-validate:name="'required'"
                        name="name"
                        placeholder="Введите имя и фамилию"
                        v-model="name"
                      >
                      <span
                        class="error-default"
                        v-show="errors.has('name')"
                      >{{errors.first('name')}}</span>
                    </div>

                    <div class="bg0 m-b-22">
                      <input
                        class="stext-111 bor8 cl8 plh3 size-111 p-lr-15"
                        type="text"
                        name="email"
                        v-validate:email="'required|email'"
                        placeholder="Введите эл. почту"
                        v-model="email"
                      >
                      <span
                        class="error-default"
                        v-show="errors.has('email')"
                      >{{errors.first('email')}}</span>
                    </div>

                    <div class="bg0 m-b-22">
                      <input
                        class="stext-111 bor8 cl8 plh3 size-111 p-lr-15"
                        v-mask="'+(##)-###-###-##-##'"
                        id="tel"
                        type="tel"
                        v-validate:tel="'required|phoneNumber'"
                        name="tel"
                        placeholder="Введите номер телефона"
                        v-model="tel"
                      >
                      <span class="error-default" v-show="errors.has('tel')">{{errors.first('tel')}}</span>
                    </div>
                    <div class="form-input-wrapper mb-4">
                      <textarea
                        type="text"
                        name="comment"
                        placeholder="Добавьте пожелания к заказу, если таковые имеются"
                        v-model="comment"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex-w flex-t p-t-27 p-b-33">
                <div class="size-208">
                  <span class="mtext-101 cl2">Итого:</span>
                </div>

                <div class="size-209 p-t-1">
                  <span class="mtext-110 cl2">{{totalBucketPrice}} грн</span>
                </div>
              </div>

              <button
                type="submit"
                class="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer my-btn"
              >Заказ подтверждаю</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "~/plugins/axios";
import storeService from "~/services/storeServices";
import { mask } from "vue-the-mask";

export default {
  directives: {
    mask
  },
  data() {
    return {
      name: "",
      email: "",
      tel: "",
      comment: "",
      quantity: ""
    };
  },
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
  methods: {
    onInput(event, item) {
      this.$store.commit("setBucketItemQuantity", {
        item,
        amount: event.target.value
      });
    },
    increase(item) {
      this.$store.commit("icreaseBucketItemQuantity", { item, amount: 1 });
    },
    decrease(item) {
      this.$store.commit("decreaseBucketItemQuantity", { item, amount: 1 });
    },
    async makeOrder() {
      let valid = await this.$validator.validateAll();
      if (valid && this.bucket && this.bucket.length > 0) {
        let regExp = new RegExp(/(\(|\)|\+|-)/g);
        this.tel = this.tel.replace(regExp, "");
        await axios.post("/api/orders", {
          name: this.name,
          email: this.email,
          products: this.products,
          tel: this.tel,
          comment: this.comment,
          totalPrice: this.totalBucketPrice
        });
        storeService.removeLocalStorageBucket("mrbucket");
        storeService.cleanBucket(this.$store);
        // need for redirecting and cleaning bu
        window.location.href = "/";
        alert("Заказ оформлен");
      }
    },
    removeItemFromBucket(index) {
      this.$store.commit("removeItemFromBucketByIndex", { index });
      storeService.removeLocalStorageBucket("mrbucket");
      storeService.setLocalStorageBucket(this.$store.state);
    }
  },
  mounted() {
    console.log("this ", this.products);
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
  max-height: 120px;
  max-width: 120px;
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
</style>