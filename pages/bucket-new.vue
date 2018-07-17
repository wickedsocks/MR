<template>
  <form novalidate>
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-8">
          <div class="table-responsive">
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
                <tr class="vertical-align-child-center">
                  <th scope="row">
                    <div class="d-flex align-items-center justify-content-center">
                      <img src="~/assets/img/product-detail-01.jpg" class="product-image pr-2" alt="">Имя товара траливали</div>
                  </th>
                  <td>{{price}} грн</td>
                  <td>
                    <div class="wrap-num-product my-1 flex-nowrap d-flex">
                      <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m" @click="decrease()">
                        <i class="fs-16 zmdi zmdi-minus"></i>
                      </div>

                      <input class="mtext-104 cl3 txt-center num-product" type="number" name="num-product" v-model="quantity">

                      <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m" @click="increase()">
                        <i class="fs-16 zmdi zmdi-plus"></i>
                      </div>
                    </div>
                  </td>
                  <td>{{price * quantity}} грн</td>
                  <td class="pointer delete-button">Удалить</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-12 col-lg-4">
          <div class="main-border p-4">
            <h4 class="mtext-109 font-weight-bold">
              Всего
            </h4>

            <div class="flex-w flex-t bor12 p-b-13">
              <div class="size-208">
                <span class="stext-110 cl2">
                  Итого:
                </span>
              </div>

              <div class="size-209">
                <span class="mtext-110 cl2">
                  {{price * quantity}} грн
                </span>
              </div>
            </div>

            <div class="flex-w flex-t bor12 p-t-15">

              <div class="p-r-0-sm w-full-ssm">
                <p class="stext-111 cl6 p-t-2">
                  При заказе от такой то суммы доставка бесплатная Самовывоз оттуда Дни доставки такие то
                </p>

                <div class="p-t-15">
                  <span class="stext-112 cl8">
                    Оформить заказ
                  </span>

                  <div class="bg0 m-b-12">
                    <input class="stext-111 bor8 cl8 plh3 size-111 p-lr-15" type="text" v-validate:name="'required'" name="name" placeholder="Введите имя и фамилию" v-model="name">
                    <span class="error-default" v-show="errors.has('name')"> {{errors.first('name')}} </span>
                  </div>

                  <div class=" bg0 m-b-22">
                    <input class="stext-111 bor8 cl8 plh3 size-111 p-lr-15" type="text" name="email" v-validate:email="'required|email'" placeholder="Введите эл. почту" v-model="email">
                    <span class="error-default" v-show="errors.has('email')"> {{errors.first('email')}} </span>
                  </div>

                  <div class=" bg0 m-b-22">
                    <input class="stext-111 bor8 cl8 plh3 size-111 p-lr-15" v-mask="'+(##)-###-###-##-##'" id="tel" type="tel" v-validate:tel="'required|phoneNumber'" name="tel" placeholder="Введите номер телефона" v-model="tel">
                    <span class="error-default" v-show="errors.has('tel')"> {{errors.first('tel')}} </span>
                  </div>
                  <div class="form-input-wrapper mb-4">
                    <textarea type="text" name="comment" placeholder="Добавьте пожелания к заказу, если таковые имеются" v-model="comment"></textarea>
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
                  {{price * quantity}} грн
                </span>
              </div>
            </div>

            <button class="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer my-btn">
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
  height: auto;
  width: 100%;
  max-width: 60px;
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
.form-input-wrapper {
  textarea {
    height: 100px;
    outline: none;
    resize: none;
    border: 1px solid #e6e6ee;
    border-radius: 3px;
    width: 100%;
    padding: 10px;
  }
}
</style>