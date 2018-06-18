<template>
  <div>
    <!-- Header -->
    <header>
      <!-- Header desktop -->
      <div class="container-menu-desktop">
        <!-- Topbar (black bar in the top of page) -->
        <div class="top-bar">
        </div>

        <div class="wrap-menu-desktop" :class="{'fixed-top': scroll}">
          <nav class="limiter-menu-desktop container">

            <!-- Logo desktop -->
            <a href="#" class="logo">
              <!-- <img src="img/icons/logo-01.png" alt="IMG-LOGO"> -->
              Логотип
            </a>

            <!-- Menu desktop -->
            <div class="menu-desktop">
              <ul class="main-menu">
                <li>
                  <nuxt-link to="/">Главная</nuxt-link>
                </li>

                <li>
                  <nuxt-link to="/create/product">Создать товар</nuxt-link>
                </li>

                <li>
                  <nuxt-link to="/orders">Заказы</nuxt-link>
                </li>
              </ul>
            </div>

            <!-- Icon header -->
            <div class="wrap-icon-header flex-w flex-r-m">
              <div class="icon-header-item cl2 hov-cl1 trans-04 pl-2 pr-2 js-show-modal-search d-flex align-items-center">
                <input type="text" id='search' class="form-control" placeholder="Искать...">
                <label for="search" class="input-group-btn pl-2 mb-0">
                  <i class="zmdi zmdi-search"></i>
                </label>
              </div>

              <div class="icon-header-item cl2 hov-cl1 trans-04 pl-3 pr-2 js-show-cart" :class="{'icon-header-noti': bucketLength > 0}" :data-notify="bucketLength"
                @click="showSideBarBucket()">
                  <i class="zmdi zmdi-shopping-cart"></i>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <!-- Header Mobile -->
      <div class="wrap-header-mobile">
        <!-- Logo moblie -->
        <div class="logo-mobile">
          <a href="index.html">
            Логотип
            <!-- <img src="img/icons/logo-01.png" alt="IMG-LOGO"> -->
          </a>
        </div>

        <!-- Icon header -->
        <div class="wrap-icon-header flex-w flex-r-m m-r-15">
          <div class="icon-header-item cl2 hov-cl1 trans-04 p-r-11 js-show-modal-search">
            <i class="zmdi zmdi-search"></i>
          </div>

          <div class="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart" data-notify="2">
            <i class="zmdi zmdi-shopping-cart"></i>
          </div>

          <a href="#" class="dis-block icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti" data-notify="0">
            <i class="zmdi zmdi-favorite-outline"></i>
          </a>
        </div>

        <!-- Button show menu -->
        <div class="btn-show-menu-mobile hamburger hamburger--squeeze">
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </div>
      </div>

      <!-- Menu Mobile -->
      <div class="menu-mobile">
        <ul class="topbar-mobile">
          <li>
            <div class="left-top-bar">
              Free shipping for standard order over $100
            </div>
          </li>

          <li>
            <div class="right-top-bar flex-w h-full">
              <a href="#" class="flex-c-m p-lr-10 trans-04">
                Help & FAQs
              </a>

              <a href="#" class="flex-c-m p-lr-10 trans-04">
                My Account
              </a>

              <a href="#" class="flex-c-m p-lr-10 trans-04">
                EN
              </a>

              <a href="#" class="flex-c-m p-lr-10 trans-04">
                USD
              </a>
            </div>
          </li>
        </ul>

        <ul class="main-menu-m">
          <li>
            <a href="index.html">Home</a>
            <ul class="sub-menu-m">
              <li>
                <a href="index.html">Homepage 1</a>
              </li>
              <li>
                <a href="home-02.html">Homepage 2</a>
              </li>
              <li>
                <a href="home-03.html">Homepage 3</a>
              </li>
            </ul>
            <span class="arrow-main-menu-m">
              <i class="fa fa-angle-right" aria-hidden="true"></i>
            </span>
          </li>

          <li>
            <a href="product.html">Shop</a>
          </li>

          <li>
            <a href="shoping-cart.html" class="label1 rs1" data-label1="hot">Features</a>
          </li>

          <li>
            <a href="blog.html">Blog</a>
          </li>

          <li>
            <a href="about.html">About</a>
          </li>

          <li>
            <a href="contact.html">Contact</a>
          </li>
        </ul>
      </div>

      <!-- Modal Search -->
      <div class="modal-search-header flex-c-m trans-04 js-hide-modal-search">
        <div class="container-search-header">
          <button class="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
            <img src="img/icons/icon-close2.png" alt="CLOSE">
          </button>

          <form class="wrap-search-header flex-w p-l-15">
            <button class="flex-c-m trans-04">
              <i class="zmdi zmdi-search"></i>
            </button>
            <input class="plh3" type="text" name="search" placeholder="Search...">
          </form>
        </div>
      </div>
    </header>
    <side-bucket-bar :showHide='showHide' @close='close'/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SideBucketBar from "~/components/SideBucketBar.vue";

export default {
  components: {
    SideBucketBar
  },
  computed: mapGetters(["bucketLength"]),
  data() {
    return {
      scroll: false,
      showHide: false
    };
  },
  methods: {
    scrollEvent() {
      this.scroll = window.pageYOffset > 0;
    },
    showSideBarBucket() {
      console.log(this.showHide);
      this.showHide = true;
    },
    close() {
      this.showHide = false;
    }
  },
  mounted() {
    if (process.browser) {
      document.addEventListener("scroll", this.scrollEvent);
    }
  },
  destroyed() {
    document.removeEventListener("scroll", this.scrollEvent);
  }
};
</script>

<style lang="scss" scoped>
a {
  color: inherit;
}
.fixed-top {
  top: 0;
  box-shadow: 0 0px 3px 0px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
}
label {
  cursor: pointer;
}
.nuxt-link-exact-active {
  color: #6c7ae0;
}
</style>

