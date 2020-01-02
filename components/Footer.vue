<template>
  <footer class="py-3 px-5 bg3 fixed-bottom position-relative d-flex justify-content-between">
    <div class="section-with-name">
      <nuxt-link to="/" class="logo-link">
        <div class="logo-icon">
          <span class="capital-letter">М</span>
          <span class="logo-text">ихайловские ряды</span>
        </div>
      </nuxt-link>
      <div>
        <p class="mt-3 text-white">
          Михайловские ряды,
          <br />интернет - магазин икон,
          <br />православных подарков,
          <br />сувениров и церковной утвори &copy; 2019
        </p>
      </div>
    </div>
    <div class="pages">
      <div class="mb-3 mt-3 font-weight-bold">Каталог:</div>
      <nuxt-link to="/">Главная</nuxt-link>
      <nuxt-link to="/contacts">Контакты</nuxt-link>
      <nuxt-link to="/discounts">Скидки и Акции</nuxt-link>
    </div>
    <div class="contacts">
      <div class="mb-3 mt-3 font-weight-bold">Контактная информация:</div>
      <a href="tel:+380936985323">
        <i class="zmdi zmdi-hc-lg zmdi-phone"></i> +380936985323
      </a>
      <br />
      <a href="tel:+380675782005">
        <i class="zmdi zmdi-hc-lg zmdi-phone"></i> +380675782005
      </a>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
footer {
  div {
    margin-right: 30px;
  }
}
.logo-link {
  &:hover {
    text-decoration: none;
  }
}
.logo-icon {
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 500;
  &:hover {
    .capital-letter {
      text-decoration: none;
    }
    .logo-text {
      text-decoration: underline;
    }
  }
  .capital-letter {
    font-weight: bold;
    font-size: 24px;
    border: 2px solid #fff;
    padding: 3px 8px;
  }
}

.pages {
  display: flex;
  flex-direction: column;
  color: #ffffff;
  a {
    color: #ffffff;
  }
}
.contacts {
  color: #ffffff;
  a {
    color: #fff;
  }
}
</style>