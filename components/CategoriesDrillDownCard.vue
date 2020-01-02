<template>
  <div class="product-item d-flex">
    <div
      class="card"
    >
      <nuxt-link :to="`/categories/${category.url}`" class="d-flex flex-column" v-if="category">
        <img
          class="card-img-top"
          v-if="category.image"
          :src="category.image"
          :alt="category.name"
        />
        <div class="card-body">
          <h5 class="card-title">{{category.name}}</h5>
          <!-- <p class="card-text card-price">{{category.productProperties[0].price}} грн</p> -->
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["category"],
  mounted() {
  }

}
</script>

<style lang="scss" scoped>
.product-item {
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  overflow-y: hidden;
  overflow-x: scroll;
  // &::-webkit-scrollbar {
  //   display: block;
  //   height: 6px;
  // }
  // &::-webkit-scrollbar-thumb {
  //   background: #6d6d6d;
  //   border-radius: 25px;
  //   display: block;
  //   height: 6px;
  // }
}
.card-img-top {
  height: 180px;
  width: auto;
  object-fit: contain;
}

.card-body {
  padding: 10px;
}

.card {
  width: 175px;
  flex-shrink: 0;
  & + .card {
    margin-left: 10px;
  }
  button {
    margin: 0 10px 10px;
  }
}

.my-link {
  text-decoration: none;
  cursor: auto;
}

.card-title {
  font-size: 15px;
  font-weight: normal;
}

.card-description {
  font-size: 13px;
}

.card-price {
  font-size: 18px;
  font-weight: 500;
}
</style>
