import Vue from "vue";
const VeeValidate = require("vee-validate");

const dictionary = {
  en: {
    custom: {
      title: {
        required: "Имя обязательно и должно содержать краткое описание товара",
        min: "Поле должно содержать минимум 10 символов"
      },
      mykeywords: {
        required: "Укажите ключевые слова для поиска"
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
      },
      color: {
        required: "Укажите пожалуйста цвет изделия"
      },
      password: {
        required: "Обязательное поля для заполнения",
        min: "Минимальная длина 6 символов"
      },
      passwordconfirm: {
        required: "Обязательное поля для заполнения"
      }
    }
  }
};
// // // Custom validation rules
const phoneNumber = {
  getMessage: () => `Введите корректный формат телефона`,
  validate(value) {
    let regExp = new RegExp(/\+\(\d{1,2}\)-\d{3}-\d{3}-\d{2}-\d{2}/g);
    return regExp.test(value);
  }
}

VeeValidate.Validator.extend('phoneNumber', phoneNumber)

VeeValidate.Validator.localize(dictionary);
Vue.use(VeeValidate);