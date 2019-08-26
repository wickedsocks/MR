<template>
  <section>
    <nuxt-link to="/products-by-categories/create" class="btn btn-success mb-4">Создать новую</nuxt-link>
    <ul>
      <li v-for="(category, index) in allCategories" :key="index" class="d-flex flex-column">
        <div class="d-flex justify-content-between">
          <span>{{category.name}}</span>
          <button class="btn btn-success" @click="toggleEdit(index)">Редактировать</button>
        </div>
        <div v-if="openFlags[index]">
          <div class="edit-block" v-for="(value, key) in category" :key="key">
            <div v-if="key !== '_id'">
              <span>{{key}} :</span>
              <input
                class="form-control"
                v-model="subCategories[index]"
                v-if="key == 'subCategories'"
              >
              <input class="form-control" v-model="category[key]" v-else>
            </div>
            <div v-else>
              <span>{{key}} :</span><span>{{category[key]}}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <button @click="updateCategories" class="btn btn-success">Обновить</button>
  </section>
</template>
<script>
import commonServices from "~/services/commonServices";
import axiosService from "~/services/axiosService";
export default {
  computed: {
    openFlags() {
      return this.allCategories.map(() => false);
    },
    allCategories() {
      return commonServices.copyObjectThroughJSON(this.$store.state.categories);
    },
    subCategories() {
      let subCategoriesLocal = [];
      this.allCategories.forEach(item => {
        subCategoriesLocal.push(item.subCategories.join(","));
      });
      return subCategoriesLocal;
    }
  },
  fetch({ store, redirect }) {
    if (!store.state.user || !store.state.user.admin) {
      redirect("/");
    }
  },
  methods: {
    toggleEdit(index) {
      this.openFlags[index] = !this.openFlags[index];
      this.$forceUpdate();
    },
    updateCategories() {
      this.allCategories.forEach((item, index) => {
        if (this.subCategories[index] && this.subCategories.length > 0) {
          item.subCategories = commonServices
            .removeSpacesFromString(this.subCategories[index])
            .split(",");
        }
      });
      axiosService.updateCategories(this.allCategories).then(
        success => {
          console.log("success ", success);
          this.$store.commit("setCategories", this.allCategories);
        },
        err => {
          console.log("err ", err);
        }
      );
    }
  }
};
</script>
<style scoped>
li {
  display: block;
  padding: 10px 15px;
  border: 1px solid #c4c4c4;
  border-radius: 3px;
}
</style>


