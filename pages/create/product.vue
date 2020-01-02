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
      <div class="col-12 d-flex flex-wrap">
        <input class="form-control col-8" v-model="requestData.mykeywords" type="text" v-validate="'required'" name='mykeywords' placeholder="Ключенвые слова">
        <span class="error-default" v-show="errors.has('mykeywords')"> {{errors.first('mykeywords')}} </span>
      </div>
    </section>
    <section class="row">
      <div class="col-12 d-flex flex-wrap">
        <input class="form-control col-8" v-model="requestData.canonicalUrl" type="text" name='canonicalUrl' placeholder="Ссылку на дубль если существует">
        <!-- <span class="error-default" v-show="errors.has('mykeywords')"> {{errors.first('mykeywords')}} </span> -->
      </div>
    </section>
    <section class="row">
      <div class="col-12 d-flex justify-content-center flex-wrap">
        <textarea class="form-control" v-model="requestData.description" cols="30" rows="10" placeholder="Подробное описание, добавить пример извне" name="description" v-validate="'required|min:30'"></textarea>
        <span class="error-default" v-show="errors.has('description')"> {{errors.first('description')}} </span>
      </div>
    </section>
    <section class="row size-option" v-for="(property, index) in requestData.productProperties" :key='index'>
      <div class="col-xs-12 col-sm-12 col-md-6 d-flex align-items-center flex-wrap no-gutters">
        <div class="col-xs-12 col-sm-12 d-flex align-items-center flex-wrap mb-1">
          <input type="number" v-model="property.width" name="width" class="form-control col-6" placeholder="Укажите ширину" v-validate="'required'">
          <span class="col-6">Ширина в мм</span>
          <span class="error-default" v-show="errors.has('width')"> {{errors.first('width')}} </span>
        </div>
        <div class="col-xs-12 col-sm-12 d-flex align-items-center flex-wrap mb-1">
          <input type="number" name="height" v-model="property.height" class="form-control col-6" placeholder="Укажите высоту" v-validate="'required'">
          <span class="col-6">Высота в мм</span>
          <span class="error-default" v-show="errors.has('height')"> {{errors.first('height')}} </span>
        </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 d-flex align-items-center flex-wrap no-gutters">
        <div class="col-xs-12 col-sm-12 d-flex align-items-center flex-wrap mb-1">
          <input type="number" name="price" v-model="property.price" class="form-control col-6" placeholder="Укажите цену" v-validate="'required'">
          <span class="col-6">Грн</span>
          <span class="error-default" v-show="errors.has('price')"> {{errors.first('price')}} </span>
        </div>
      </div>
    </section>
    <section class="row">
      <div class="col-12">
        <button type="button" class="btn btn-success mr-2" @click="addOneMoreProductProperty()">Добавить ещё размер и цену</button>
        <button type="button" class="btn btn-danger" @click="removeOneMoreProductProperty()">Удалить последнюю запись из списка</button>
      </div>
    </section>
    <section class="row">
      <div class="col-xs-12 col-sm-12 d-flex align-items-center flex-wrap mb-1" v-for="(item, index) in requestData.colorArray" :key="index">
          <input type="text" name="color" class="form-control col-6" v-model="requestData.colorArray[index]" placeholder="Укажите цвет" v-validate="'required'">
          <span class="col-6">Цвет изделия</span>
          <span class="error-default" v-show="errors.has('color')"> {{errors.first('color')}} </span>
        </div>
    </section>
    <section class="row">
      <div class="col-12">
        <button type="button" class="btn btn-success mr-2" @click="addOneMoreColor()">Добавить ещё цвет</button>
        <button type="button" class="btn btn-danger" @click="removeOneColor()">Удалить последний цвет</button>
      </div>
    </section>
    <section class="row">
      <div class="col-xs-12 col-sm-12 d-flex align-items-center flex-wrap mb-1" v-for="(item, index) in requestData.categoriesArray" :key="index">
          <select class="custom-select" name="product" v-model="requestData.selectedCategories[index]" v-validate="'required'">
            <option value="" disabled>Категория товара</option>
            <option :value="cat._id" v-for="cat in categories" :key="cat._id">
              {{cat.name}}
            </option>
          </select>
          <span class="error-default" v-show="errors.has('product')"> {{errors.first('product')}} </span>
        </div>
    </section>
    <section class="row">
      <div class="col-12">
        <button type="button" class="btn btn-success mr-2" @click="addOneMoreCategory()">Добавить ещё категорию</button>
        <button type="button" class="btn btn-danger" @click="removeOneCategory()">Удалить последнию категорию</button>
      </div>
    </section>
    <button type="submit" class="btn btn-success">Добавить товар</button>
    <spinning-loader v-if="showLoader"></spinning-loader>
    <notifications v-if="showSuccessMessage" @close="closeNotifications()" :success="textService.productSaved"></notifications>
  </form>
</template>

<script>
import axios from '~/plugins/axios';
import storeService from '~/services/storeServices';
import textService from '~/services/textService.js';
import SpinningLoader from "~/components/SpinningLoader.vue";
import Notifications from "~/components/Notifications.vue";

export default {
  components: {
    SpinningLoader,
    Notifications
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    }
  },
  mounted() {
  },
  data() {
    return {
      textService: textService,
      showLoader: false,
      showSuccessMessage: false,
      images: [],
      requestData: {
        title: '',
        mykeywords: '',
        canonicalUrl: '',
        description: '',
        productProperties: [
          {
            height: '',
            width: '',
            color: '',
            price: ''
          }
        ],
        colorArray: [
          ''
        ],
        categoriesArray: [
          ''
        ],
        imagesUrlsArray: [],
        selectedCategories: []
      }
    };
  },
  fetch({ store, redirect }) {
    if (!store.state.user || !store.state.user.admin) {
      redirect('/');
    }
  },
  methods: {
    addOneMoreProductProperty() {
      this.requestData.productProperties.push({
        height: '',
        width: '',
        color: '',
        price: ''
      });
    },
    removeOneMoreProductProperty() {
      this.requestData.productProperties.length > 1
        ? this.requestData.productProperties.splice(
            this.requestData.productProperties.length - 1,
            1
          )
        : this.requestData.productProperties;
    },
    addOneMoreColor() {
      this.requestData.colorArray.push('');
    },
    removeOneColor() {
      this.requestData.colorArray.length > 1
        ? this.requestData.colorArray.splice(
            this.requestData.colorArray.length - 1,
            1
          )
        : this.requestData.colorArray;
    },
    addOneMoreCategory() {
      this.requestData.categoriesArray.push('');
    },
    removeOneCategory() {
      this.requestData.categoriesArray.length > 1
        ? this.requestData.categoriesArray.splice(
            this.requestData.categoriesArray.length - 1,
            1
          )
        : this.requestData.categoriesArray;
    },
    closeNotifications() {
      this.showSuccessMessage = false;
    },
    async sendForm() {
      try {
        let valid = await this.$validator.validateAll();
        if (valid) {
          this.showLoader = true;
          let imagesUploaded = await this.uploadImagesToServer(this.images, this.requestData.title + new Date().getTime());
          imagesUploaded.forEach(img => {
            // NOTE: replace http with https to save in DB for production
            this.requestData.imagesUrlsArray.push(
              img.data.url.replace('http://', 'https://')
            );
          });
          let response = await this.serverRequestUploadData();
          this.$store.commit('addProduct', response.data);
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
          let firstError = this.$validator.errors.items[0].field;
          let el = document.querySelector(`[name=${firstError}]`);
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'end'
          });
        }
      } catch (error) {
        this.showLoader = false;
        console.log('error ', error);
      }
    },
    serverRequestUploadData() {
      return axios.post('/api/products', {
        ...this.requestData,
        categories: this.requestData.selectedCategories,
        images: this.requestData.imagesUrlsArray
      });
    },
    uploadImagesToServer(images, name) {
      var promiseArray = [];
      if (images && images.length > 0) {
        images.forEach((item, index) => {
          let form = new FormData();
          form.append('file', item.file);
          form.append('name', `${name + index}`);
          promiseArray.push(axios.post('/api/products/upload-image', form));
        });
      } else {
        promiseArray.push(Promise.reject('Images array empty'));
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
      document.getElementById('images').value = '';
      arr.splice(index, 1);
    },
    // Renew data after success upload
    clearAndSetInitValues() {
      this.images = [];
      this.requestData = {
        title: '',
        description: '',
        productProperties: [
          {
            height: '',
            width: '',
            color: '',
            price: ''
          }
        ],
        colorArray: [
          ''
        ],
        imagesUrlsArray: [],
        selectedCategories: []
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
  background-image: url('~/assets/img/camera.png');
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
    content: ' ';
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
