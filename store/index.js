import storeService from "./../services/storeServices";

export const state = () => ({
  bucket: [],
  products: []
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
  }
};

// methods for async operations
export const actions = {
  async nuxtServerInit({
    commit
  }) {
    await storeService.getProducts(commit);
  }
};
