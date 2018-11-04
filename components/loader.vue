<template>
  <div>
    <div v-show="showLoader" class="loader-wrapper">
      <div class="loader"></div>
    </div>
    <div v-if="success" class="success-message-wrapper">
      <div class="success-message success-message-text">
        {{message}}
      </div>
    </div>
    <div v-if='error' class="success-message-wrapper">
      <div class="success-message error-message-text">
        {{message}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'showLoader',
    'success',
    'message',
    'error'
  ]
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

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.loader-wrapper,
.success-message-wrapper {
  background: rgba(130, 130, 130, 0.32941);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
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
.success-message {
  position: absolute;
  height: 180px;
  width: 300px;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  border-radius: 4px;
  font-size: 26px;
  padding: 50px;
  text-align: center;
  animation-name: fadeIn;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.success-message-text {
  color:#1fb264;
}
.success-message-text {
  color:#1fb264;
}
.error-message-text {
 color: red; 
}
</style>

