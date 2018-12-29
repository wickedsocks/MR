<template>
  <section >
    <h1 class="title">
      404
    </h1>
    <h2 class="info">
      Страница не найдена
    </h2>
    <nuxt-link class="button" to="/">
      На главную
    </nuxt-link>
  </section>
</template>
<script>
export default {
  props: ['error'],
  asyncData({params, redirect, res}) {
    res.status(404);
    if (params && params.pathMatch) {
      redirect(301,'/404.html');
    }
  }
};
</script>

<style lang='scss' scoped>
.title {
  margin-top: 15px;
  font-size: 5em;
}
.info {
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
}
.button {
  margin-top: 50px;
}
.logo-icon {
  display: flex;
  align-items: center;
  color: #000;
  font-weight: 500;
}
.capital-letter {
  font-weight: bold;
  font-size: 24px;
  border: 2px solid #000;
  padding: 3px 8px;
}
</style>
