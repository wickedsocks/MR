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
            <!-- menu for big screen -->
            <li class="nav-item d-none d-lg-block">
              <nuxt-link class="nav-link" to="/">Главная</nuxt-link>
            </li>
            <li class="nav-item d-none d-lg-block">
              <nuxt-link class="nav-link" to="/create/product">Создать товар</nuxt-link>
            </li>
            <li class="nav-item d-none d-lg-block">
              <nuxt-link class="nav-link" to="/bucket">
              <span>
                Корзина
                <span class='orders-count d-flex align-content-center justify-content-center btn-warning' v-if="ordersLength && ordersLength > 0">{{ordersLength}}</span> 
              </span>
                </nuxt-link>
            </li>
            <!-- menu for big screen end -->
            <!-- menu for small screen -->
            <li class="nav-item d-block d-lg-none" data-toggle="collapse" data-target="#navbarResponsive">
              <nuxt-link class="nav-link" to="/">Главная</nuxt-link>
            </li>
            <li class="nav-item d-block d-lg-none" data-toggle="collapse" data-target="#navbarResponsive">
              <nuxt-link class="nav-link" to="/create/product">Создать товар</nuxt-link>
            </li>
            <li class="nav-item d-block d-lg-none" data-toggle="collapse" data-target="#navbarResponsive">
              <nuxt-link class="nav-link" to="/bucket">
                <span>
                  Корзина
                  <span class='orders-count d-flex align-content-center justify-content-center btn-warning' v-if="ordersLength && ordersLength > 0">{{ordersLength}}</span> 
                </span>
                </nuxt-link>
            </li>
            <!-- menu for small screen end -->
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["ordersLength"])
};
</script>


<style lang="scss" scoped>
header {
  margin-bottom: 56px;
}
.nuxt-link-exact-active {
  color: #ffffff !important;
}

.nav-link > span {
  position: relative;
}

.orders-count {
  position: absolute;
  border-radius: 50%;
  height: 18px;
  width: 18px;
  color: #000;
  border: none;
  font-size: 12px;
  right: -10px;
  top: -10px;
}
</style>
