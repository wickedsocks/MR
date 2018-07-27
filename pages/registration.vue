<template>
  <form>
    <div class="form-group">
      <label for="email">Адрес эл. почты</label>
      <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Введите эл. почту">
    </div>
    <div class="form-group">
      <label for="pass1">Пароль</label>
      <input type="password" class="form-control" id="pass1" placeholder="Пароль">
    </div>
    <div class="form-group">
      <label for="pass2">Повторите пароль</label>
      <input type="password" class="form-control" id="pass2" placeholder="Пароль">
    </div>
    <button type="submit" class="btn btn-primary">Регистрация</button>
  </form>
</template>

<script>
export default {};
</script>

<style>
</style>
