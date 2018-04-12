<template>
  <section class="pop-up-wrapper" @click.self="hidePopUp()">
    <div class="product-quantity form-control">
      <header class="d-flex justify-content-between">
        <h5> {{product.title}} </h5>
        <div class="close" @click="hidePopUp()">X</div>
      </header>
      <div class="product-wrapper d-flex justify-content-between">
        <img :src="product.images[0]" :alt="product.title">
        <div class="counter d-flex align-items-center">
          <button class="btn btn-success" @click="minus()">-</button>
          <input type="number" class="form-control" v-model="quantity">
          <button class="btn btn-success" @click="plus()">+</button>
        </div>
        <button class="btn btn-success align-self-end" @click="addToBucket(product, quantity), hidePopUp()">В корзину</button>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      quantity: 1
    };
  },
  props: ["product"],
  methods: {
    plus() {
      if (!this.quantity) {
        this.quantity = 1;
      } else {
        this.quantity += 1;
      }
    },
    minus() {
      this.quantity -= 1;
    },
    hidePopUp() {
      this.$emit("close-pop-up");
    },
    addToBucket(product, quantity) {
      this.$store.commit('addNewOrder', {product, quantity});
    }
  }
};
</script>

<style lang="scss" scoped>
.pop-up-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(130, 130, 130, 0.32941);
}
.product-quantity {
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  height: 320px;
  width: 60%;
  text-align: right;
}

header {
  border-bottom: 1px solid #efefef;
}

.product-wrapper {
  img {
    height: 200px;
    width: 200px;
    margin: 10px 10px 10px 0;
  }
}

.counter {
  button {
    margin: 0 4px;
  }
}
</style>
