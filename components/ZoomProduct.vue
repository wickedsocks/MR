<template>
  <div class="position-fixed zoom-wrapper d-flex align-items-center justify-content-center" @click.self="closePopUp()">
    <div class="container">
      <div class="row">
        <div class="col-12 image-wrapper">
          <img :src="src">
          <button class="close-button hov3 trans-04 position-absolute" @click="closePopUp()">
            <i class="zmdi zmdi-close"></i>
          </button>
          <div class="left position-absolute hov3 trans-04 pointer" @click="changeImage(-1)">
            <i class="zmdi zmdi-arrow-left"></i>
          </div>
          <div class="right position-absolute hov3 trans-04 pointer" @click="changeImage(1)">
            <i class="zmdi zmdi-arrow-right"></i>
          </div>
          <div class="photo-number position-absolute">
            {{ photoIndex + 1 }} из {{ photoAmount }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["src", "photoIndex", "photoAmount"],
  methods: {
    closePopUp() {
      this.$emit("close-big-popup");
    },
    changeImage(number) {
      this.$emit("change-image", number);
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  max-width: 100%;
  width: auto;
  height: 100%;
  max-height: 100%;
  object-fit: contain;
}
.zoom-wrapper {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1100;
  background-color: rgba(0, 0, 0, 0.8);
}
.close-button {
  top: -50px;
  right: 14px;
  font-size: 35px;
  color: #ffffff;
}
.right,
.left {
  font-size: 35px;
  color: #ffffff;
  top: 0;
  bottom: 0;
  height: 40px;
  width: 20px;
  margin: auto;
}
.left {
  left: -20px;
}
.right {
  right: -20px;
}
.photo-number {
  font-size: 18px;
  font-family: sans-serif;
  color: #ffffff;
  margin-top: 10px;
  right: 0;
  left: 0;
  text-align: center;
}
.image-wrapper {
  max-height: 700px;
  text-align: center;
}
</style>

