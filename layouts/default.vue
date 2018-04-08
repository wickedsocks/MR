<template>
  <div>
    <my-header/>
    <div class="main-wrapper">
      <nuxt/>
    </div>
    <my-footer/>
  </div>
</template>

<script>
import MyFooter from "~/components/Footer.vue";
import MyHeader from "~/components/Header.vue";

export default {
  components: {
    MyFooter,
    MyHeader
  }
};
</script>

<style lang="scss" scoped>

.main-wrapper {
  min-height: calc(100vh - 112px);
  padding-bottom: 50px;
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
</style>
