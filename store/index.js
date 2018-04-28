import storeService from "./../services/storeServices";

export const state = () => ({
  bucket: [],
  products: [],
  categories: {}
});

// Like a computed properties
export const getters = {
  bucketLength(state) {
    return state.bucket.length;
  },
  getSpecifiedProduct(state) {
    return (id) => state.products.find((item) => item._id == id);
  },
  totalBucketPrice(state) {
    let price = 0;
    state.bucket.forEach((item) => {
      price += item.product.price * item.quantity;
    });
    return price;
  },
  getCategoryById(state) {
    return (id) => {
      let categoriesNames = Object.keys(state.categories);
      let findCategory;
      categoriesNames.some((catName) => {
        if (!findCategory) {
          findCategory = state.categories[catName].find((item) => item._id == id);
        }
      })
      return findCategory;
    }
  }
}

// methods for sync operations
export const mutations = {
  addNewBucketItem(state, payload) {
    // Increasing same bucket item quantity if bucket item already exists in state.bucket
    // if not -> pushing new one in array
    let sameBucketItem = storeService.increaseSameBucketItemQuantity(state.bucket, payload);
    if (!sameBucketItem) {
      state.bucket.push(payload);
    }
    storeService.setCookieBucket(state);
  },
  setProducts(state, payload) {
    state.products = payload.slice();
  },
  addProduct(state, payload) {
    state.products.push(payload);
  },
  setCategories(state, payload) {
    state.categories = Object.assign({}, payload);
  }
};

// methods for async operations
export const actions = {
  async nuxtServerInit({
    commit
  }) {
    let [products, categories] = await Promise.all([storeService.getProducts(), storeService.getCategories()])
    commit('setCategories', categories);
    commit('setProducts', products.data);
  }
};