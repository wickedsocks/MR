<template>
<form class="container" novalidate @submit.prevent="validateBeforeSubmit">
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
</form>
</template>

<script>
export default {
  data() {
    return {
      email: ""
    };
  },
  methods: {
    validateBeforeSubmit() {
      console.log("this validator", this.$validator);
      this.$validator.validateAll().then((result) => {
        if (result) {
          // eslint-disable-next-line
          alert("Form Submitted!");
          return;
        }

        alert("Correct them errors!");
      });
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
