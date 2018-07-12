<template>
  <form>
    <div class="container">
      <div class="row">
        <div class="col-8">
          <div class="row">
            <div class="col-12 d-flex justify-content-between main-border p-2">
              <div class="col-4">Product</div>
              <div class="col-2 text-center">Price</div>
              <div class="col-3 text-center">Quantity</div>
              <div class="col-3 text-center">Total</div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 d-flex justify-content-between main-border p-2">
              <div class="col-4 d-flex align-items-center justify-content-center">
                <img src="~/assets/img/product-detail-01.jpg" class="product-image pr-2" alt="">Имя товара траливали</div>
              <div class="col-2  d-flex align-items-center justify-content-center">{{price}} грн</div>
              <div class="col-3  d-flex justify-content-center align-items-center">
                <div class="wrap-num-product my-1 flex-w">
                  <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m" @click="decrease()">
                    <i class="fs-16 zmdi zmdi-minus"></i>
                  </div>

                  <input class="mtext-104 cl3 txt-center num-product" type="number" name="num-product" v-model="quantity">

                  <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m" @click="increase()">
                    <i class="fs-16 zmdi zmdi-plus"></i>
                  </div>
                </div>
              </div>
              <div class="col-3 d-flex align-items-center justify-content-center"> {{price * quantity}} грн</div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="main-border p-4">
            <h4 class="mtext-109">
              Cart Totals
            </h4>

            <div class="flex-w flex-t bor12 p-b-13">
              <div class="size-208">
                <span class="stext-110 cl2">
                  Итого:
                </span>
              </div>

              <div class="size-209">
                <span class="mtext-110 cl2">
                  $79.65
                </span>
              </div>
            </div>

            <div class="flex-w flex-t bor12 p-t-15 p-b-30">
              <div class="size-208 w-full-ssm">
                <span class="stext-110 cl2">
                  Доставка:
                </span>
              </div>

              <div class="size-209 p-r-18 p-r-0-sm w-full-ssm">
                <p class="stext-111 cl6 p-t-2">
                  При заказе от такой то суммы доставка бесплатная
                  Самовывоз оттуда 
                  Дни доставки такие то
                </p>

                <div class="p-t-15">
                  <span class="stext-112 cl8">
                    Calculate Shipping
                  </span>

                  <div class="size-204 w-100 py-3">
                    <div>
                      <select class="custom-select pointer" name="time">
                        <option>Choose an option</option>
                        <option>Size S</option>
                        <option>Size M</option>
                        <option>Size L</option>
                        <option>Size XL</option>
                      </select>
                    </div>
                  </div>

                  <div class="bor8 bg0 m-b-12">
                    <input class="stext-111 cl8 plh3 size-111 p-lr-15" type="text" name="state" placeholder="State /  country">
                  </div>

                  <div class="bor8 bg0 m-b-22">
                    <input class="stext-111 cl8 plh3 size-111 p-lr-15" type="text" name="postcode" placeholder="Postcode / Zip">
                  </div>

                  <div class="flex-w">
                    <div class="flex-c-m stext-101 cl2 size-115 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer">
                      Update Totals
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div class="flex-w flex-t p-t-27 p-b-33">
              <div class="size-208">
                <span class="mtext-101 cl2">
                  Итого:
                </span>
              </div>

              <div class="size-209 p-t-1">
                <span class="mtext-110 cl2">
                  $79.65
                </span>
              </div>
            </div>

            <button class="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer">
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      quantity: 1,
      price: 45
    };
  },
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
    }
  }
};
</script>

<style lang="scss" scoped>
.main-border {
  border: 1px solid #e6e6e6;
}
.product-image {
  height: auto;
  width: 100%;
  max-width: 60px;
}
</style>
