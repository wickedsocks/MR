<template>
  <div>
    <my-header/>
    <div class="main-wrapper container">
      <nuxt/>
    </div>
    <my-footer/>
  </div>
</template>

<script>
import MyFooter from "~/components/Footer.vue";
import MyHeader from "~/components/Header.vue";
import storeServices from "~/services/storeServices";
import axiosService from "~/services/axiosService";
export default {
  components: {
    MyFooter,
    MyHeader
  },
  middleware: "removeSlash",
  mounted() {
    // Check if cookie is available and set bucket data
    let parsedLocalStorage = storeServices.getLocalStorageItem("mrbucket");
    if (parsedLocalStorage) {
      if (!this.$store.state.bucket.length) {
        storeServices.filledBucketFromLocalStorage(this.$store, parsedLocalStorage);
        storeServices.makeProductsConsistentWithBucket(this.$store, this.$store.state.bucket);
        this.$forceUpdate();
      }
    }
    let currentUser = storeServices.getLocalStorageUser();
    if (currentUser) {
      this.$store.commit("setUser", currentUser);
      axiosService.setDefaultHeader(currentUser.token);
    }
  }
};
</script>

<style lang="scss" scoped>
.main-wrapper {
  min-height: calc(100vh - 52px);
  padding-bottom: 50px;
  margin-top: 124px;
}

.button,
.button:visited {
  display: inline-block;
  color: black;
  letter-spacing: 1px;
  background-color: #fff;
  border: 2px solid #000;
  text-decoration: none;
  text-transform: uppercase;
  padding: 15px 45px;
}

.button:hover,
.button:focus {
  color: #fff;
  background-color: #000;
}

.title {
  color: #000;
  font-weight: 300;
  font-size: 2.5em;
  margin: 0;
}

@media screen and (max-width: 991px) {
  .main-wrapper {
    margin-top: 0;
  }
}
</style>
