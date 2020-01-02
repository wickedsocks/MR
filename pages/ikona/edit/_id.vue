<template>
  <form class="container" novalidate @submit.prevent="sendForm">
    <section class="row">
      <header class="col-12">
        <h2>Создание нового товара</h2>
      </header>
    </section>
    <!-- <section class="row">
      <div class="col-12 image-wrapper d-flex flex-wrap">
        <label class="image-select-button" for="images">
          <span class="choose-image">Выберите фотографию</span>
          <input type="file" id="images" name='images' v-validate:images="'required'" @change="getFileData($event, images)" multiple accept="image/*">
        </label>
        <div class="image-preview d-flex justify-content-center" v-if="images && images.length > 0" v-for="(image, index) in images" :key="index" @click="removeImage(index, images)">
          <div class="close-main"></div>
          <img :src="image.url">
        </div>
        <span class="error-default" v-show="errors.has('images')"> {{errors.first('images')}} </span>
      </div>
    </section>-->
    <section class="row">
      <div
        class="col-xs-12 col-sm-12 d-flex align-items-center flex-wrap mb-1"
        v-for="(item, index) in product.images"
        :key="index"
      >
        <img class="image-preview" :src="item" alt @click="removeOneImage(index)" />
        <input
          type="text"
          name="image"
          class="form-control col-6"
          v-model="product.images[index]"
          placeholder="Ссылка на фотографию"
          v-validate="'required'"
        />
        <span class="col-6">Чтобы удалить нажмите на фотографию</span>
        <span class="error-default" v-show="errors.has('image')">{{errors.first('image')}}</span>
      </div>
    </section>
    <section class="row">
      <div class="col-12">
        <button
          type="button"
          class="btn btn-success mr-2"
          @click="addOneImage()"
        >Добавить ссылку на фото</button>
        <!-- <button type="button" class="btn btn-danger" @click="removeOneImage('images', product._id)">Удалить ссылку на фото</button> -->
      </div>
    </section>
    <section class="row">
      <div class="col-12 d-flex flex-wrap">
        <input
          class="form-control col-8"
          v-model="product.title"
          type="text"
          v-validate="'required|min:10'"
          name="title"
          placeholder="Имя и краткое описание товара"
        />
        <span class="error-default" v-show="errors.has('title')">{{errors.first('title')}}</span>
      </div>
    </section>
    <section class="row">
      <div class="col-12 d-flex flex-wrap">
        <input
          class="form-control col-8"
          v-model="product.mykeywords"
          type="text"
          v-validate="'required'"
          name="mykeywords"
          placeholder="Ключенвые слова"
        />
        <span class="error-default" v-show="errors.has('mykeywords')">{{errors.first('mykeywords')}}</span>
      </div>
    </section>
    <section class="row">
      <div class="col-12 d-flex flex-wrap">
        <input
          class="form-control col-8"
          v-model="product.canonicalUrl"
          type="text"
          name="canonicalUrl"
          placeholder="Ссылку на дубль если существует"
        />
        <!-- <span class="error-default" v-show="errors.has('keywords')"> {{errors.first('keywords')}} </span> -->
      </div>
    </section>
    <section class="row">
      <div class="col-12 d-flex justify-content-center flex-wrap">
        <textarea
          class="form-control"
          v-model="product.description"
          cols="30"
          rows="10"
          placeholder="Подробное описание, добавить пример извне"
          name="description"
          v-validate="'required|min:30'"
        ></textarea>
        <span
          class="error-default"
          v-show="errors.has('description')"
        >{{errors.first('description')}}</span>
      </div>
    </section>
    <section
      class="row size-option"
      v-for="(property, index) in product.productProperties"
      :key="index"
    >
      <div class="col-xs-12 col-sm-12 col-md-6 d-flex align-items-center flex-wrap no-gutters">
        <div class="col-xs-12 col-sm-12 d-flex align-items-center flex-wrap mb-1">
          <input
            type="number"
            v-model="property.width"
            name="width"
            class="form-control col-6"
            placeholder="Укажите ширину"
            v-validate="'required'"
          />
          <span class="col-6">Ширина в мм</span>
          <span class="error-default" v-show="errors.has('width')">{{errors.first('width')}}</span>
        </div>
        <div class="col-xs-12 col-sm-12 d-flex align-items-center flex-wrap mb-1">
          <input
            type="number"
            name="height"
            v-model="property.height"
            class="form-control col-6"
            placeholder="Укажите высоту"
            v-validate="'required'"
          />
          <span class="col-6">Высота в мм</span>
          <span class="error-default" v-show="errors.has('height')">{{errors.first('height')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 d-flex align-items-center flex-wrap no-gutters">
        <div class="col-xs-12 col-sm-12 d-flex align-items-center flex-wrap mb-1">
          <input
            type="number"
            name="price"
            v-model="property.price"
            class="form-control col-6"
            placeholder="Укажите цену"
            v-validate="'required'"
          />
          <span class="col-6">Грн</span>
          <span class="error-default" v-show="errors.has('price')">{{errors.first('price')}}</span>
        </div>
      </div>
    </section>
    <section class="row">
      <div class="col-12">
        <button
          type="button"
          class="btn btn-success mr-2"
          @click="addOneMoreProductProperty()"
        >Добавить ещё размер и цену</button>
        <button
          type="button"
          class="btn btn-danger"
          @click="removeOneMoreProductProperty()"
        >Удалить последнюю запись из списка</button>
      </div>
    </section>
    <section class="row">
      <div
        class="col-xs-12 col-sm-12 d-flex align-items-center flex-wrap mb-1"
        v-for="(item, index) in product.color"
        :key="index"
      >
        <input
          type="text"
          name="color"
          class="form-control col-6"
          v-model="product.color[index]"
          placeholder="Укажите цвет"
          v-validate="'required'"
        />
        <span class="col-6">Цвет изделия</span>
        <span class="error-default" v-show="errors.has('color')">{{errors.first('color')}}</span>
      </div>
    </section>
    <section class="row">
      <div class="col-12">
        <button
          type="button"
          class="btn btn-success mr-2"
          @click="addOneMoreColor()"
        >Добавить ещё цвет</button>
        <button
          type="button"
          class="btn btn-danger"
          @click="removeOneColor()"
        >Удалить последний цвет</button>
      </div>
    </section>
    <section class="row">
      <div
        class="col-xs-12 col-sm-12 d-flex align-items-center flex-wrap mb-1"
        v-for="(item, index) in product.categories"
        :key="index"
      >
        <select
          class="custom-select"
          name="product"
          v-model="selectedCategories[index]"
          v-validate="'required'"
        >
          <option value disabled>Категория товара</option>
          <option :value="cat._id" v-for="cat in categories" :key="cat._id">{{cat.name}}</option>
        </select>
        <span class="error-default" v-show="errors.has('product')">{{errors.first('product')}}</span>
      </div>
    </section>
    <section class="row">
      <div class="col-12">
        <button
          type="button"
          class="btn btn-success mr-2"
          @click="addOneMoreCategory()"
        >Добавить ещё категорию</button>
        <button
          type="button"
          class="btn btn-danger"
          @click="removeOneCategory()"
        >Удалить последнию категорию</button>
      </div>
    </section>
    <button type="submit" class="btn btn-success">Обновить товар</button>
    <div v-show="showLoader" class="loader-wrapper">
      <div class="loader"></div>
    </div>
    <div v-show="showSuccessMessage" class="success-message-wrapper">
      <div class="success-message">Товар успешно сохранен</div>
    </div>
  </form>
</template>

<script>
import axios from "~/plugins/axios";
import storeService from "~/services/storeServices";
import commonServices from "~/services/commonServices";

export default {
   async asyncData({ params, store, redirect }) {
    try {
      let product = store.getters.getProductByUrl(params.id);
      if (!product) {
        let response = await axios.get(`/api/product?url=${params.id}`);
        product = response.data[0];
      }
      return { product: commonServices.copyObjectThroughJSON(product)};
    } catch (err) {
      redirect(301, "/404.html");
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
    selectedCategories() {
      return this.product.categories.map(cat => cat);
    }
  },
  mounted() {
  },
  data() {
    return {
      showLoader: false,
      showSuccessMessage: false
    };
  },
  fetch({ store, redirect }) {
    if (!store.state.user || !store.state.user.admin) {
      redirect("/");
    }
  },
  methods: {
    addOneMoreProductProperty() {
      this.product.productProperties.push({
        height: "",
        width: "",
        price: ""
      });
      this.$forceUpdate();
    },
    removeOneMoreProductProperty() {
      this.product.productProperties.length > 1
        ? this.product.productProperties.splice(
            this.product.productProperties.length - 1,
            1
          )
        : this.product.productProperties;
      this.$forceUpdate();
    },
    addOneImage() {
      this.product.images.push("");
      this.$forceUpdate();
    },
    removeOneImage(index) {
      this.product.images.length > 1
        ? this.product.images.splice(index, 1)
        : this.product.images;
      this.$forceUpdate();
    },
    addOneMoreColor() {
      this.product.color.push("");
      this.$forceUpdate();
    },
    removeOneColor() {
      this.product.color.length > 1
        ? this.product.color.splice(this.product.color.length - 1, 1)
        : this.product.color;
      this.$forceUpdate();
    },
    addOneMoreCategory() {
      this.product.categories.push("");
      this.$forceUpdate();
    },
    removeOneCategory() {
      this.product.categories.length > 1
        ? this.product.categories.splice(this.product.categories.length - 1, 1)
        : this.product.categories;
      this.$forceUpdate();
    },
    async sendForm() {
      try {
        let valid = await this.$validator.validateAll();
        if (valid) {
          this.showLoader = true;
          this.mergeSelectedCategoriesWithProduct();
          let response = await this.updateProductRequest();
          this.$store.commit("updateProduct", response.data);
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 2000);
          setTimeout(() => {
            this.$validator.errors.clear();
          });
          this.showSuccessMessage = true;
          this.showLoader = false;
          let categories = await storeService.getCategories();
          this.$store.commit("setCategories", categories.data);          
        } else { 
          let firstError = this.$validator.errors.items[0].field;
          let el = document.querySelector(`[name=${firstError}]`);
          el.scrollIntoView({
            behavior: "smooth",
            block: "end"
          });
        }
      } catch (error) {
        this.showLoader = false;
        console.log("error ", error);
      }
    },
    mergeSelectedCategoriesWithProduct() {
      this.product.categories = this.selectedCategories;
    },
    updateProductRequest() {
      return axios.post("/api/products/update", {
        ...this.product
      });
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  div {
    position: relative;
  }
  margin-bottom: 30px;
  flex-wrap: wrap;
}

#images {
  height: 0;
  width: 0;
  position: absolute;
  outline: none;
  overflow: hidden;
}
.image-select-button {
  padding: 20px 60px;
  cursor: pointer;
  border: 4px dashed #1fb264;
  background-image: url("~/assets/img/camera.png");
  background-position: 50% 30%;
  background-size: 30px;
  background-repeat: no-repeat;
  position: relative;
  margin-bottom: 0;
  .choose-image {
    margin-top: 20px;
    display: inline-block;
  }
}
.size-option {
  span {
    text-align: left;
  }
}

.close-main {
  position: absolute;
  margin: auto;
  top: -10px;
  right: -10px;
  height: 20px;
  width: 20px;
  opacity: 0.5;
  border-radius: 50%;
  border: 2px solid black;
  &:before,
  &:after {
    position: absolute;
    left: 6px;
    content: " ";
    height: 12px;
    width: 4px;
    top: 2px;
    background-color: #333;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
}

.image-preview {
  height: 80px;
  width: 80px;
  margin: 5px;
  border: 1px dashed #28a745;
  cursor: pointer;
  &:hover {
    .close-main {
      opacity: 1;
    }
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
}

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

@media (max-width: 767px) {
  .size-option > div + div {
    margin-top: 15px;
  }
}
</style>
