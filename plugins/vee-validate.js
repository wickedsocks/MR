import Vue from "vue";
const VeeValidate = require("vee-validate");

const dictionary = {
  en: {
    custom: {
      title: {
        required: "Имя обязательно и должно содержать краткое описание товара",
        min: "Поле должно содержать минимум 10 символов"
      },
      description: {
        required: "Обязательно поле для заполнения",
        min: "Описание должны быть как можно подробнее, минимум 30 символов",
      },
      manufacture: {
        required: "Обязательно поле для заполнения"
      },
      product: {
        required: "Обязательно поле для заполнения"
      },
      price: {
        required: "Обязательно поле для заполнения"
      },
      height: {
        required: "Обязательно поле для заполнения"
      },
      width: {
        required: "Обязательно поле для заполнения"
      },
      images: {
        required: "Обязательно поле для заполнения"
      },
      name: {
        required: "Имя обязательное поле для заполнение"
      },
      email: {
        required: "Эл. почта обязательное поле для заполнения",
        email: "Введите корректный адрес эл. почты"
      },
      tel: {
        required: "Укажите пожалуйста контактный номер телефона",
      }
    }
  }
};
// Custom validation rules
const phoneNumber = {
  getMessage: () => `Введите корректный формат телефона`,
  validate(value) {
    let regExp = new RegExp(/^((38|7|7|8)+([0-9]){10})$/gm);
    return regExp.test(value);
  }
}

VeeValidate.Validator.extend('phoneNumber', phoneNumber)

VeeValidate.Validator.localize(dictionary);
Vue.use(VeeValidate);