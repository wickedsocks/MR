<template>
  <form novalidate @submit.prevent="register">
    <div class="form-group">
      <label for="email">Ваше имя</label>
      <input type="email" class="form-control" v-model='name' name="name" v-validate:name="'required'" aria-describedby="emailHelp" placeholder="Укажите ваше имя">
      <span class="error-default" v-show="errors.has('name')"> {{errors.first('name')}} </span>
    </div>
    <div class="form-group">
      <label for="email">Адрес эл. почты</label>
      <input type="email" class="form-control" v-model='email' name="email" v-validate:email="'required|email'" aria-describedby="emailHelp" placeholder="Введите эл. почту">
      <span class="error-default" v-show="errors.has('email')"> {{errors.first('email')}} </span>
    </div>
    <div class="form-group">
      <label for="pass1">Пароль</label>
      <input type="password" class="form-control" id="pass1" placeholder="Пароль" v-model="password" v-validate:password="'required|min:6'" name='password'>
      <span class="error-default" v-show="errors.has('password')"> {{errors.first('password')}} </span>
    </div>
    <div class="form-group">
      <label for="pass2">Повторите пароль</label>
      <input type="password" class="form-control" id="pass2" placeholder="Пароль" v-model="passwordconfirm" v-validate:passwordconfirm="'required'" name='passwordconfirm'>
      <span class="error-default" v-show="errors.has('passwordconfirm')"> {{errors.first('passwordconfirm')}} </span>
    </div>
    <button type="submit" class="btn btn-primary">Регистрация</button>
  </form>
</template>

<script>
import axios from "~/plugins/axios";
export default {
  data() {
    return {
      email: "",
      name: "",
      password: "",
      passwordconfirm: ""
    };
  },
  methods: {
    async register() {
      if (this.password !== this.passwordconfirm) {
        this.$validator.errors.add(
          "passwordconfirm",
          "Пароль отличается от предыдущего, повторите пожалуйста ввод"
        );
        return;
      }
      let valid = await this.$validator.validateAll();
      if (valid) {
        try {
          let user = await axios.post("/api/users", {
            name: this.name,
            email: this.email,
            password: this.password
          });
          console.log("user saved ", user);
        } catch (e) {
          console.log("error occures ", e);
        }
      }
    }
  }
};
</script>

<style>
</style>
