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
import MyFooter from '~/components/Footer.vue';
import MyHeader from '~/components/Header.vue';
import storeServices from '~/services/storeServices';

export default {
  components: {
    MyFooter,
    MyHeader
  },
  mounted() {
    // Check if cookie is available and set bucket data
    // FIXME: rewrite
    let localStorageData = storeServices.getLocalStorageBucket('mrbucket');
    let bucketData = localStorageData.slice(0, localStorageData.length - 1);
    if (bucketData) {
      let parsedLocalStorage = JSON.parse(bucketData);
      if (!this.$store.state.bucket.length) {
        parsedLocalStorage.forEach(bucketItem => {
          this.$store.commit('addNewBucketItem', bucketItem);
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.main-wrapper {
  min-height: calc(100vh - 112px);
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
