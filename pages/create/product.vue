<template>
<form class="container" novalidate @submit.prevent="showData">
  <section class="row">
    <header class="col-12">
      <h1>Создание нового товара</h1>
    </header>  
  </section>
  <section class="col-12">
    <label class="image-select-button" for="image">
      <span class="choose-image">Выберите фотографию</span>
      <input type="file" id="image" name='image' multiple accept="image/*" v-validate="'required'">
      <span class="error-default" v-show="errors.has('image')"> {{errors.first('image')}} </span>
    </label>
  </section>
  <section class="row">
    <div class="col-12 d-flex justify-content-center">
      <input class="form-control col-8" type="text" v-validate="'required|min:10'" name='name' placeholder="Имя и краткое описание товара">
      <span class="error-default" v-show="errors.has('name')"> {{errors.first('name')}} </span>
    </div>
  </section>
  <section class="row">
    <div class="col-12 d-flex justify-content-center">
      <textarea class="form-control"
        cols="30" rows="10" placeholder="Подробное описание, добавить пример извне"
        name="description"
        v-validate="'required|min:30'"></textarea>
      <span class="error-default" v-show="errors.has('description')"> {{errors.first('description')}} </span>
    </div>
  </section>
  <section class="row size-option">
    <div class="col-6 d-flex align-items-center">
      <input type="number" name="width" class="form-control col-6" placeholder="Укажите ширину">
      <span class="col-6">Ширина в см</span>
    </div>
    <div class="col-6 d-flex align-items-center">
      <input type="number" name="height" class="form-control col-6" placeholder="Укажите высоту">
      <span class="col-6">Высота в см</span>
    </div>
  </section>
  <section>
    <h5>Продуктовая категория</h5>
    <select class="custom-select" v-model="selectedCategories.product">
      <option value="" disabled>Категория товара</option>
      <option :value="prodCat._id" v-for="prodCat in productCategory" :key="prodCat._id">
        {{prodCat.name}}
      </option>
    </select>
    <h5>Производственная категория</h5>
    <select class="custom-select" v-model="selectedCategories.manufacture">
      <option value="" disabled>Производственная категория</option>
      <option :value="manufactureCat._id" v-for="manufactureCat in manufactureCategory" :key="manufactureCat._id">
        {{manufactureCat.categoriesName}}
      </option>
    </select>
  </section>
  <button type="submit">Submit</button>
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
      email: "",
      product: '',
      selectedCategories: {
        product: '',
        manufacture: '',
      },
    };
  },
  methods: {
    showData() {
      console.log('this.selectedCategories ', this.selectedCategories);
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  text-align: center;
  margin-top: 20px;
}
section {
  div {
    position: relative;
  }
  margin-bottom: 30px;
  flex-wrap: wrap;
  text-align: center;
}

.error-default {
  width: 100%;
  font-size: 14px;
  color: red;
  position: absolute;
  bottom: -22px;
}
#image {
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
</style>
