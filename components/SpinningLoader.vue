<template>
  <div>
    <div class="loader-wrapper">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@keyframes loaderSpin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.loader-wrapper{
  background: rgba(130, 130, 130, 0.32941);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}
.loader {
  height: 70px;
  width: 70px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #1fb264;
  border-radius: 50%;
  animation-name: loaderSpin;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

</style>

