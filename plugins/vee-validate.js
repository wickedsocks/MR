import Vue from "vue";
const VeeValidate = require("vee-validate");

const dictionary = {
  en: {
    custom: {
      name: {
        required: "Имя обязательно и должно содержать краткое описание товара",
        min: "Имя обязательно и должно содержать краткое описание товара"
      },
      description: {
        required: "Обязательно поле для заполнения",
        min: "Описание должны быть как можно подробнее, минимум 30 символов",
      }
    }
  }
};

VeeValidate.Validator.localize(dictionary);
Vue.use(VeeValidate);
