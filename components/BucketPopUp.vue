<template>
  <section class="pop-up-wrapper" @click.self="hidePopUp()">
    <div class="container form-control">
      <div class="row no-gutters">
        <header class="col-12 d-flex justify-content-between align-items-center">
          {{product.title}}
          <span class="close" @click="hidePopUp()">X</span>
        </header>
      </div>
      <div class="row no-gutters">
        <div class="col-12 col-md-4">
          <img :src="product.images[0]" :alt="product.title" class="img-fluid image">
        </div>
        <div class="col-12 col-md-7 description">
          <p>
            <span class="font-weight-bold">Наименование: </span>{{product.title}}
          </p>
          <p>
            <span class="font-weight-bold">Описание: </span>{{product.description}}
          </p>
          <p>
            <span class="font-weight-bold">Категория: </span>{{productCategory}}<br>
            <span class="font-weight-bold">Изготовлено из: </span>{{manufactureCategory}}<br>
            <span class="font-weight-bold">Ширина: </span>{{product.width}} см <br>
            <span class="font-weight-bold">Высота: </span>{{product.height}} см
          </p>
          <p>
            <span class="font-weight-bold">Цена: </span>{{product.price}} грн
          </p>
        </div>
      </div>
      <div class="row no-gutters counter justify-content-between">
        <span class="font-weight-bold col-12">Количество:</span>
        <div class="col-12 col-md-6 d-flex justify-content-between flex-wrap">
          <input type="number" class="form-control col-12" v-model="quantity">
          <button class="btn btn-success col-5" @click="decrease()">-</button>
          <button class="btn btn-success col-5" @click="increase()">+</button>
        </div>
        <div class="col-12 col-md-5">
          <p class="col-12 total-price">
            <span class="font-weight-bold">Общая стоимость: </span>{{product.price * quantity}} грн
          </p>
          <button class="btn btn-success col-12" @click="addToBucket(product, quantity); hidePopUp()">Купить</button>
        </div>
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
  computed: {
    productCategory() {
      return this.$store.getters.getCategoryById(this.product.productCategory).name;
    },
    manufactureCategory() {
      return this.$store.getters.getCategoryById(this.product.manufactureCategory).name;
    }
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
    },
    addToBucket(product, quantity) {
      this.$store.commit("addNewBucketItem", { product, quantity });
    },
    closeWithEsc(event) {
      if (event.keyCode == 27) {
        this.hidePopUp();
      }
    }
  },
  mounted() {
    // prevent scrolling while component is showing
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    document.addEventListener("keyup", this.closeWithEsc);
  },
  destroyed() {
    document.getElementsByTagName("body")[0].style.overflow = "visible";
    document.removeEventListener("keyup", this.closeWithEsc);
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
  padding-bottom: 10px;
}

.description {
  margin-top: 10px;
}

.counter {
  input {
    padding: 6px 12px;
  }
  button {
    margin-top: 10px;
  }
}

.total-price {
  margin-top: 10px;
}
@media screen and (min-width: 720px) {
  .description {
    margin-left: 10px;
    margin-top: 0;
  }
  .image {
    margin-top: 7px;
  }

  .total-price {
    margin-top: 0;
  }
}
</style>
