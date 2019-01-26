<template>
  <section>
    <ul>
      <li v-for="(category, index) in allCategories" :key="index" class="d-flex flex-column">
        <div class="d-flex justify-content-between">
          <span>{{category.name}}</span>
          <button
            class="btn btn-success"
            @click="toggleEdit(index)"
          >Редактировать</button>
        </div>
        <div v-if="openFlags[index]">
          <div class="edit-block" v-for="(value, key) in category" :key="key">
            <span>{{key}} :</span>
            <input
              class="form-control"
              v-model="parentCategory[index]"
              v-if="key == 'parentCategory'"
            >
            <input class="form-control" v-model="category[key]" v-else>
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
    parentCategory() {
      let parentCategoryLocal = [];
      this.allCategories.forEach(item => {
        parentCategoryLocal.push(item.parentCategory.join(","));
      });
      return parentCategoryLocal;
    }
  },
  fetch({ store, redirect }) {
    if (!store.state.user || !store.state.user.admin) {
      redirect('/');
    }
  },
  methods: {
    toggleEdit(index) {
      this.openFlags[index] = !this.openFlags[index];
      this.$forceUpdate();
    },
    updateCategories() {
      this.allCategories.forEach((item, index) => {
        if (this.parentCategory[index] && this.parentCategory.length > 0) {
          item.parentCategory = commonServices
            .removeSpacesFromString(this.parentCategory[index])
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


