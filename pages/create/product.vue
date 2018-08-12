<template>
  <form class="container" novalidate @submit.prevent="sendForm">
    <section class="row">
      <header class="col-12">
        <h2>Создание нового товара</h2>
      </header>
    </section>
    <section class="row">
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
    </section>
    <section class="row">
      <div class="col-12 d-flex flex-wrap">
        <input class="form-control col-8" v-model="requestData.title" type="text" v-validate="'required|min:10'" name='title' placeholder="Имя и краткое описание товара">
        <span class="error-default" v-show="errors.has('title')"> {{errors.first('title')}} </span>
      </div>
    </section>
    <section class="row">
      <div class="col-12 d-flex justify-content-center flex-wrap">
        <textarea class="form-control" v-model="requestData.description" cols="30" rows="10" placeholder="Подробное описание, добавить пример извне" name="description" v-validate="'required|min:30'"></textarea>
        <span class="error-default" v-show="errors.has('description')"> {{errors.first('description')}} </span>
      </div>
    </section>
    <section class="row size-option">
      <div class="col-xs-12 col-sm-12 col-md-4 d-flex align-items-center flex-wrap">
        <input type="number" v-model="requestData.width" name="width" class="form-control col-6" placeholder="Укажите ширину" v-validate="'required'">
        <span class="col-6">Ширина в см</span>
        <span class="error-default" v-show="errors.has('width')"> {{errors.first('width')}} </span>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-4 d-flex align-items-center flex-wrap">
        <input type="number" name="height" v-model="requestData.height" class="form-control col-6" placeholder="Укажите высоту" v-validate="'required'">
        <span class="col-6">Высота в см</span>
        <span class="error-default" v-show="errors.has('height')"> {{errors.first('height')}} </span>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-4 d-flex align-items-center flex-wrap">
        <input type="number" name="price" v-model="requestData.price" class="form-control col-6" placeholder="Укажите цену" v-validate="'required'">
        <span class="col-6">Грн</span>
        <span class="error-default" v-show="errors.has('price')"> {{errors.first('price')}} </span>
      </div>
    </section>
    <section class="row">
      <div class="col-xs-12 col-sm-12 col-md-4 d-flex align-items-center flex-wrap">
        <input type="text" name="color" v-model="requestData.color" class="form-control col-6" placeholder="Укажите цвет" v-validate="'required'">
        <span class="col-6">Цвет изделия</span>
        <span class="error-default" v-show="errors.has('color')"> {{errors.first('color')}} </span>
      </div>
    </section>
    <section>
      <select class="custom-select" name="product" v-model="requestData.selectedCategories.product" v-validate="'required'">
        <option value="" disabled>Категория товара</option>
        <option :value="prodCat._id" v-for="prodCat in productCategory" :key="prodCat._id">
          {{prodCat.name}}
        </option>
      </select>
      <span class="error-default" v-show="errors.has('product')"> {{errors.first('product')}} </span>
    </section>
    <section>
      <select class="custom-select" name="manufacture" v-model="requestData.selectedCategories.manufacture" v-validate="'required'">
        <option value="" disabled>Производственная категория</option>
        <option :value="manufactureCat._id" v-for="manufactureCat in manufactureCategory" :key="manufactureCat._id">
          {{manufactureCat.name}}
        </option>
      </select>
      <span class="error-default" v-show="errors.has('manufacture')"> {{errors.first('manufacture')}} </span>
    </section>
    <button type="submit" class="btn btn-success">Добавить товар</button>
    <div v-show="showLoader" class="loader-wrapper">
      <div class="loader"></div>
    </div>
    <div v-show="showSuccessMessage" class="success-message-wrapper">
      <div class="success-message">
        Товар успешно сохранен
      </div>
    </div>
  </form>
</template>

<script>
import axios from "~/plugins/axios";
import storeService from "~/services/storeServices";

export default {
  computed: {
    productCategory() {
      return this.$store.state.categories.productCategory;
    },
    manufactureCategory() {
      return this.$store.state.categories.manufactureCategory;
    }
  },
  data() {
    return {
      showLoader: false,
      showSuccessMessage: false,
      images: [],
      requestData: {
        title: "",
        description: "",
        width: null,
        height: null,
        price: null,
        color: "",
        imagesUrlsArray: [],
        selectedCategories: {
          product: "",
          manufacture: ""
        }
      }
    };
  },
  fetch({ store, redirect }) {
    if (!store.state.user || !store.state.user.data.admin) {
      redirect("/");
    }
  },
  methods: {
    async sendForm() {
      try {
        let valid = await this.$validator.validateAll();
        if (valid) {
          this.showLoader = true;
          let imagesUploaded = await this.uploadImagesToServer(this.images);
          imagesUploaded.forEach(img => {
            this.requestData.imagesUrlsArray.push(img.data.url);
          });
          let response = await this.serverRequestUploadData();
          this.$store.commit("addProduct", response.data);
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 2000);
          setTimeout(() => {
            this.$validator.errors.clear();
          });
          this.showSuccessMessage = true;
          this.showLoader = false;
          this.clearAndSetInitValues();
          let categories = await storeService.getCategories();
          this.$store.commit('setCategories', categories);
        } else {
          console.log("this.$validator.error ", this.$validator.errors.items);
          let firstError = this.$validator.errors.items[0].field;
          let el = document.querySelector(`[name=${firstError}]`);
          console.log("el ", el);
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
    serverRequestUploadData() {
      return axios.post("/api/products", {
        productCategory: this.requestData.selectedCategories.product,
        manufactureCategory: this.requestData.selectedCategories.manufacture,
        images: this.requestData.imagesUrlsArray,
        title: this.requestData.title,
        description: this.requestData.description,
        color: this.requestData.color,
        height: this.requestData.height,
        width: this.requestData.width,
        price: this.requestData.price
      });
    },
    uploadImagesToServer(images) {
      var promiseArray = [];
      if (images && images.length > 0) {
        images.forEach(item => {
          let form = new FormData();
          form.append("file", item.file);
          promiseArray.push(axios.post("/api/products/upload-image", form));
        });
      } else {
        promiseArray.push(Promise.reject("Images array empty"));
      }
      return Promise.all(promiseArray);
    },
    // on change event handler returns urls
    getFileData(event, filesArray) {
      if (event.target.files && event.target.files.length > 0) {
        for (let i = 0; i < event.target.files.length; i++) {
          const file = event.target.files[i];
          const reader = new FileReader();
          reader.onloadend = () => {
            filesArray.push({ url: reader.result, file });
          };
          reader.readAsDataURL(file);
        }
      }
    },
    // remove fire from array
    removeImage(index, arr) {
      // clearing input value available readding same image
      document.getElementById("images").value = "";
      arr.splice(index, 1);
    },
    // Renew data after success upload
    clearAndSetInitValues() {
      this.images = [];
      this.requestData = {
        title: "",
        description: "",
        width: null,
        height: null,
        price: null,
        imagesUrlsArray: [],
        selectedCategories: {
          product: "",
          manufacture: ""
        }
      };
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
