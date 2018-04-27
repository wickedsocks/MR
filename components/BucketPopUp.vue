<template>
  <section class="pop-up-wrapper" @click.self="hidePopUp()">
    <div class="container form-control">
      <div class="row no-gutters">
        <header class="col-12">
          <span class="close" @click="hidePopUp()">X</span>
          {{product.title}}
        </header>
      </div>
      <div class="row no-gutters">
        <div class="col-12">
          <img :src="product.images[0]" :alt="product.title" class="img-fluid image">
        </div>
        <div class="col-12 description">
          <p>
            <span class="font-weight-bold">Наименование: </span>{{product.title}}
          </p>
          <p>
            <span class="font-weight-bold">Описание: </span>{{product.description}}
          </p>
          <p>
            <span class="font-weight-bold">Категория: </span>{{product.manufactureCategory}}<br>
            <span class="font-weight-bold">Изготовлено из: </span>{{product.productCategory}}<br>
            <span class="font-weight-bold">Ширина: </span>{{product.width}} см <br>
            <span class="font-weight-bold">Высота: </span>{{product.height}} см
          </p>
          <p>
            <span class="font-weight-bold">Цена: </span>{{product.price}} грн
          </p>
        </div>
      </div>
      <div class="row no-gutters counter justify-content-between">
        <input type="number" class="form-control" v-model="quantity">
        <button class="btn btn-success col-5" @click="decrease()">-</button>
        <button class="btn btn-success col-5" @click="increase()">+</button>
      </div>
      <div class="row no-gutters">
        <p>
          <span class="font-weight-bold">Общая стоимость: </span>{{product.price * quantity}} грн
        </p>
      </div>
      <div class="row no-gutters">
        <button class="btn btn-success col-12" @click="addToBucket(product, quantity); hidePopUp()">Купить</button>
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
    increase() {
      if (!this.quantity) {
        this.quantity = 1;
      } else {
        this.quantity += 1;
      }
    },
    decrease() {
      this.quantity -= 1;
    },
    hidePopUp() {
      this.$emit("close-pop-up");
      // return scrolling while component is not showing
      document.getElementsByTagName("body")[0].style.overflow = "visible";
      document
        .getElementsByTagName("body")[0]
        .removeEventListener("touchmove", function(e) {
          e.preventDefault();
        });
    },
    addToBucket(product, quantity) {
      this.$store.commit("addNewBucketItem", { product, quantity });
    }
  },
  mounted() {
    // prevent scrolling while component is showing
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    document
      .getElementsByTagName("body")[0]
      .addEventListener("touchmove", function(e) {
        e.preventDefault();
      });
  }
};
</script>

<style lang="scss" scoped>
.close {
  display: block;
  border: 1px solid black;
  border-radius: 4px;
  padding: 4px;
}
.pop-up-wrapper {
  padding: 20px 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1100;
  background: rgba(130, 130, 130, 0.32941);
  overflow-x: hidden;
  overflow-y: scroll;
}

.image {
  display: block;
  margin: 0 auto;
}

.row {
  margin-bottom: 10px;
}

.product-quantity {
  position: absolute;
}

header {
  border-bottom: 1px solid #efefef;
}

.description {
  margin-top: 10px;
}

.counter {
  button {
    margin-top: 10px;
  }
}
</style>
