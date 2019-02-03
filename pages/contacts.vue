<template>
  <div>
    <h1>Контакты</h1>
    <div>
      Телефон:
      <a href="tel:+380936985323"> <i class="zmdi zmdi-hc-lg zmdi-phone"></i> +380936985323</a>
    </div>
    <div class="mt-3">
      или
    </div>
    <form novalidate @submit.prevent="makeOrder" class="d-flex flex-column">
      <div class="p-t-15">
        <span class="stext-112 cl8">
          Свяжитесь с нами через форму
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
          <textarea type="text" name="comment" placeholder="Опишите волнующий Вас вопрос и мы свяжимся с Вами для уточнения деталей." v-model="comment"></textarea>
        </div>
      </div>
      <button type="submit" class=" stext-101 cl0 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer my-btn align-self-end">
        Написать нам
      </button>
    </form>
  </div>
</template>

<script>
import axios from '~/plugins/axios';
import { mask } from 'vue-the-mask';
export default {
  directives: {
    mask
  },
  data() {
    return {
      name: '',
      email: '',
      tel: '',
      comment: '',
      quantity: '',
      showLoader: '',
      success: '',
      message: '',
      error: ''
    };
  },
  methods: {
    async makeOrder() {
      let valid = await this.$validator.validateAll();
      if (valid) {
        try {
          let regExp = new RegExp(/(\(|\)|\+|-)/g);
          this.tel = this.tel.replace(regExp, '');
          this.showLoader = true;
          await axios.post('/api/contact-us', {
            name: this.name,
            email: this.email,
            tel: this.tel,
            comment: this.comment
          });
          this.showLoader = false;
          this.success = true;
          this.message = 'Ваш запрос отправлен, с Вами свяжутся';
          setTimeout(() => {
            this.success = false;
            window.location.href = '/';
          }, 2000);
        } catch (err) {
          this.showLoader = false;
          this.error = true;
          this.message = err;
          setTimeout(() => {
            this.error = false;
          }, 2000);
        }
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
.error-default {
  color: red;
  font-size: 12px;
}
.my-btn {
  color: #ffffff;
  outline: none;
  padding: 10px 25px;
}
a {
  color: #555;
}
</style>

