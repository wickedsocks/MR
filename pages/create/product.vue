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
          <img :src="image">
      </div>
      <span class="error-default" v-show="errors.has('images')"> {{errors.first('images')}} </span>
    </div>
  </section>
  <section class="row">
    <div class="col-12 d-flex flex-wrap">
      <input class="form-control col-8" v-model="title" type="text" v-validate="'required|min:10'" name='title' placeholder="Имя и краткое описание товара">
      <span class="error-default" v-show="errors.has('title')"> {{errors.first('title')}} </span>
    </div>
  </section>
  <section class="row">
    <div class="col-12 d-flex justify-content-center flex-wrap">
      <textarea class="form-control"
        v-model="description"
        cols="30" rows="10" placeholder="Подробное описание, добавить пример извне"
        name="description"
        v-validate="'required|min:30'"></textarea>
      <span class="error-default" v-show="errors.has('description')"> {{errors.first('description')}} </span>
    </div>
  </section>
  <section class="row size-option">
    <div class="col-xs-12 col-sm-12 col-md-4 d-flex align-items-center flex-wrap">
      <input type="number" v-model="width" name="width" class="form-control col-6" placeholder="Укажите ширину" v-validate="'required'">
      <span class="col-6">Ширина в см</span>
      <span class="error-default" v-show="errors.has('width')"> {{errors.first('width')}} </span>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-4 d-flex align-items-center flex-wrap">
      <input type="number" name="height" v-model="height" class="form-control col-6" placeholder="Укажите высоту" v-validate="'required'">
      <span class="col-6">Высота в см</span>
      <span class="error-default" v-show="errors.has('height')"> {{errors.first('height')}} </span>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-4 d-flex align-items-center flex-wrap">
      <input type="number" name="price" v-model="price" class="form-control col-6" placeholder="Укажите цену" v-validate="'required'">
      <span class="col-6">Цена</span>
      <span class="error-default" v-show="errors.has('price')"> {{errors.first('price')}} </span>
    </div>
  </section>
  <section>
      <select class="custom-select" name="product" v-model="selectedCategories.product" v-validate="'required'">
        <option value="" disabled>Категория товара</option>
        <option :value="prodCat._id" v-for="prodCat in productCategory" :key="prodCat._id">
          {{prodCat.name}}
        </option>
      </select>
      <span class="error-default" v-show="errors.has('product')"> {{errors.first('product')}} </span>
  </section>
  <section> 
    <select class="custom-select" name="manufacture" v-model="selectedCategories.manufacture" v-validate="'required'">
      <option value="" disabled>Производственная категория</option>
      <option :value="manufactureCat._id" v-for="manufactureCat in manufactureCategory" :key="manufactureCat._id">
        {{manufactureCat.name}}
      </option>
    </select>
    <span class="error-default" v-show="errors.has('manufacture')"> {{errors.first('manufacture')}} </span>
  </section>
  <button type="submit" class="btn btn-success">Добавить товар</button>
</form>
</template>

<script>
import axios from "~/plugins/axios";

export default {
  async asyncData() {
    let productCategory = await axios.get("/api/categories/product");
    let manufactureCategory = await axios.get("/api/categories/manufacture");
    return {
      productCategory: productCategory.data,
      manufactureCategory: manufactureCategory.data
    };
  },
  data() {
    return {
      title: "",
      description: "",
      images: [],
      width: null,
      height: null,
      price: null,
      selectedCategories: {
        product: "",
        manufacture: ""
      }
    };
  },
  methods: {
    sendForm() {
      // TODO: should filter images first of all add images to cloudinary and add property to axios request
      this.$validator.validateAll().then((success) => {
        if (success) {
          alert('Товар отправлен на сервер');
          // TODO: uncomment when fix problem with images
          // axios
          //   .post("/api/products", {
          //     productCategory: this.selectedCategories.product,
          //     manufactureCategory: this.selectedCategories.manufacture,
          //     images: ['1', '2', '3', '4'],
          //     title: this.title,
          //     description: this.description,
          //     height: this.height,
          //     width: this.width,
          //     price: this.price
          //   })
          //   .then(
          //     (success) => {
          //       console.log("product response ", success);
          //     },
          //     (error) => {
          //       console.log("error ", error);
          //     }
          //   );
        } else {
          console.log('error occurs');
        }
      });
    },
    // on change event handler returns urls
    getFileData(event, filesArray) {
      if (event.target.files && event.target.files.length > 0) {
        for (let i = 0; i < event.target.files.length; i++) {
          const file = event.target.files[i];
          const reader = new FileReader();
          reader.onloadend = () => {
            filesArray.push(reader.result);
          };
          reader.readAsDataURL(file);
        }
      }
    },
    // remove fire from array
    removeImage(index, arr) {
      arr.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  margin-bottom: 50px;
}
header {
  margin-top: 20px;
}
section {
  div {
    position: relative;
  }
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.error-default {
  width: 100%;
  font-size: 14px;
  color: red;
  white-space: pre-line;
}
#images {
  display: none;
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

@media (max-width: 767px) {
  .size-option > div + div {
    margin-top: 15px;
  }
}
</style>
