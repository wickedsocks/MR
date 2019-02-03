<template>
  <div>
    <div v-if="success && !showError" class="success-message-wrapper
    d-flex align-items-center justify-content-center">
      <div class="message success-message-text">
        {{success}}
        <div @click="close()" class="close-btn pointer">Закрыть</div>
      </div>
    </div>
    <div v-if="error && showError" class="success-message-wrapper">
      <div class="message error-message-text">
        {{error}}
        <div @click="close()" class="close-btn pointer">Закрыть</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["success", "error", "showError"],
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>
<style lang="scss" scoped>
@keyframes fadeIn {
  0% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.8;
  }
}
.success-message-wrapper {
  background: rgba(130, 130, 130, 0.32941);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}
.message {
  position: relative;
  margin: 0 100px;
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
  color: #1fb264;
}
.error-message-text {
  color: red;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #000000;
  font-size: 16px;
  &:hover {
    text-decoration: underline;
  }
}
</style>


