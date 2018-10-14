<template>
  <div>
    <!-- Header -->
    <header>
      <!-- Header desktop -->
      <div class="container-menu-desktop">
        <!-- Topbar (black bar in the top of page) -->
        <div class="top-bar">
          <div class="container">
            <div class="row justify-content-end login-wrapper align-items-center">
              <div class="text-white">
                <nuxt-link v-if="!currentUser" to="/login">Войти</nuxt-link>
                <nuxt-link v-if="currentUser" @click.native="logout" to="/">Выйти</nuxt-link>
              </div>
              <div class="text-white">
                <nuxt-link to="/registration">регистрация</nuxt-link>
              </div>
            </div>
          </div>
        </div>

        <div class="wrap-menu-desktop" :class="{'shadow': scroll}">
          <nav class="limiter-menu-desktop container">

            <!-- Logo desktop -->
            <nuxt-link to="/" class="logo-link">
              <div class="logo-icon">
                <span class="capital-letter">М</span><span class="logo-text">ихайловские ряды</span>
              </div>
            </nuxt-link>

            <!-- Menu desktop -->
            <div class="menu-desktop">
              <ul class="main-menu">
                <li>
                  <nuxt-link to="/">Главная</nuxt-link>
                </li>

                <li>
                  <nuxt-link to="/create/product" v-if="currentUser && currentUser.admin">Создать товар</nuxt-link>
                </li>

                <li>
                  <nuxt-link to="/orders" v-if="currentUser && currentUser.admin">Заказы</nuxt-link>
                </li>
              </ul>
            </div>

            <!-- Icon header -->
            <div class="wrap-icon-header flex-w flex-r-m">
              <search-input :id="'search2'" />

              <nuxt-link to='/bucket' class="icon-header-item cl2 hov-cl1 trans-04 pl-3 pr-2 js-show-cart" :class="{'icon-header-noti': bucketLength > 0}" :data-notify="bucketLength">
                <i class="zmdi zmdi-shopping-cart"></i>
              </nuxt-link>
            </div>
          </nav>
        </div>
      </div>

      <!-- Header Mobile -->
      <div class="wrap-header-mobile flex-wrap">
        <!-- Logo moblie -->
        <div class="logo-mobile">
          <nuxt-link to='/' class="logo-link">
            <div class="logo-icon">
              <span class="capital-letter">М</span><span class="logo-text">ихайловские ряды</span>
            </div>
          </nuxt-link>
        </div>

        <div class="d-flex justify-content-center col-12 col-sm-8">
          <!-- Icon header -->
          <div class="wrap-icon-header d-flex align-items-center justify-content-end m-r-15">
            <search-input :id='"search1"' />
            <nuxt-link to='bucket' class="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart" :class="{'icon-header-noti': bucketLength > 0}" :data-notify="bucketLength">
              <i class="zmdi zmdi-shopping-cart"></i>
            </nuxt-link>
          </div>

          <!-- Button show menu -->
          <div class="btn-show-menu-mobile hamburger hamburger--squeeze" @click="showMobileMenu()" :class="{'is-active': showMobile}">
            <span class="hamburger-box">
              <span class="hamburger-inner"></span>
            </span>
          </div>
        </div>

        <!-- Menu Mobile -->
        <div class="menu-mobile dis-block my-menu-mobile" ref="mobileMenu">
          <ul class="main-menu-m">
            <li>
              <nuxt-link to="/">Главная</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/create/product" v-if="currentUser && currentUser.admin">Создать товар</nuxt-link>
            </li>

            <li>
              <nuxt-link to="/orders" v-if="currentUser && currentUser.admin">Заказы</nuxt-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- Modal Search -->
      <div class="modal-search-header flex-c-m trans-04 js-hide-modal-search">
        <div class="container-search-header">
          <form class="wrap-search-header flex-w p-l-15">
            <button class="flex-c-m trans-04">
              <i class="zmdi zmdi-search"></i>
            </button>
            <input class="plh3" type="text" name="search" placeholder="Search...">
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import axios from '~/plugins/axios';
import { mapGetters } from 'vuex';
import SearchInput from '~/components/SearchInput.vue';
import storeServices from '~/services/storeServices';

export default {
  components: {
    SearchInput
  },
  computed: mapGetters(['bucketLength', 'currentUser']),
  data() {
    return {
      scroll: false,
      showMobile: false
    };
  },
  methods: {
    scrollEvent() {
      this.scroll = window.pageYOffset > 0;
    },
    showMobileMenu() {
      this.showMobile = !this.showMobile;
      this.$refs.mobileMenu.style.height = this.$refs.mobileMenu.style.height
        ? ''
        : this.$refs.mobileMenu.scrollHeight + 'px';
    },
    async logout() {
      try {
        await axios.delete('/api/users/logout');
        console.log('logged out');
        this.$store.commit('removeUser');
        storeServices.removeLocalStorageUser();
      } catch (e) {
        console.log('error occurs ', e);
      }
    }
  },
  mounted() {
    if (process.browser) {
      document.addEventListener('scroll', this.scrollEvent);
    }
  },
  destroyed() {
    document.removeEventListener('scroll', this.scrollEvent);
  }
};
</script>

<style lang="scss" scoped>
a {
  color: inherit;
}
.top-bar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
  & > .container {
    height: 100%;
  }
}
.shadow {
  box-shadow: 0 0px 3px 0px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
}
label {
  cursor: pointer;
}
.nuxt-link-exact-active {
  color: #6c7ae0;
}
.my-menu-mobile {
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
}
.my-menu-mobile {
  a {
    font-family: sans-serif;
    font-size: 14px;
    font-weight: 600;
  }
  .nuxt-link-exact-active {
    color: #ffffff;
    text-decoration: underline;
  }
}

.login-wrapper {
  margin: 0 15px;
  height: 100%;
  div {
    a {
      color: #ffffff;
      text-transform: capitalize;
    }
    & + div {
      margin-left: 20px;
    }
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
  color: #000;
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
    border: 2px solid #000;
    padding: 3px 8px;
  }
}
</style>

