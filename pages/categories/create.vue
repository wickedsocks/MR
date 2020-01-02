<template>
  <section>
    <div>
      <div class="edit-block">
          <input class="form-control mb-2" placeholder="Имя" v-model="name">
          <input class="form-control mb-3" placeholder="Описание" v-model="description">
      </div>
    </div>
    <button @click="createCategory" class="btn btn-success">Создать категорию</button>
  </section>
</template>
<script>
import axiosService from "~/services/axiosService";
export default {
  data() {
    return {
      name: '',
      description: ''
    }
  },
  fetch({ store, redirect }) {
    if (!store.state.user || !store.state.user.admin) {
      redirect("/");
    }
  },
  methods: {
    createCategory() {
      axiosService.createCategory({name: this.name, description: this.description}).then(
        success => {
          this.$store.commit("setCategories", success);
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


