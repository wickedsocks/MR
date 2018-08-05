<template>
  <form novalidate @submit.prevent="login">
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
    <button type="submit" class="btn btn-primary">Войти</button>
  </form>
</template>

<script>
import axios from "~/plugins/axios";
import axiosService from "~/services/axiosService.js";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      let valid = await this.$validator.validateAll();
      if (valid) {
        try {
          let user = await axios.post("/api/users/login", {
            email: this.email,
            password: this.password
          });
          this.$store.commit('setUser', user);
          axiosService.setDefaultHeader(user.headers['x-auth']);
          this.$router.push('/');
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
