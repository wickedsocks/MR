<template>
  <header>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-header fixed-top">
      <div class="container">
        <nuxt-link class="navbar-brand" to="/">Михайловские ряды</nuxt-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item" data-toggle="collapse" data-target="#navbarResponsive">
              <nuxt-link class="nav-link" to="/">Главная</nuxt-link>
            </li>
            <li class="nav-item" data-toggle="collapse" data-target="#navbarResponsive">
              <nuxt-link class="nav-link" to="/create/product">Создать товар</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
export default {};
</script>


<style lang="scss" scoped>
header {
  margin-bottom: 56px;
}
.nuxt-link-exact-active {
  color: #ffffff !important;
}
</style>
