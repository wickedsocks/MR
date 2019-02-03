import storeService from "./../services/storeServices";


export const state = () => ({
  bucket: [],
  products: [],
  categories: [],
  concatCategories: [],
  orders: [],
  user: null
});

// Like a computed properties
export const getters = {
  bucketLength(state) {
    return state.bucket.length;
  },
  getProductById(state) {
    return (id) => state.products.find((item) => item._id == id);
  },
  getProductByUrl(state) {
    return (url) => state.products.find((item) => item.url == url);
  },
  totalBucketPrice(state) {
    let price = 0;
    state.bucket.forEach((item) => {
      price += item.product.productProperties[item.sizeIndex].price * item.quantity;
    });
    return price;
  },
  getCategoryById(state) {
    return (id) => {
      return state.categories.find((item) => {
        if (item._id == id) {
          return item;
        }
      });
    }
  },
  getConcatCategoryById(state) {
    return (id) => {
      return state.concatCategories.find((item) => {
        if (item._id == id) {
          return item;
        }
      });
    }
  },
  getCategoriesByName(state) {
    return (name) => {
      return state.categories.find((item) => {
        if (item.name == name) {
          return item;
        }
      });
    }
  },
  getCategoryByUrl(state) {
    return (url) => {
      for (const key in state.categories) {
          const category = state.categories[key];
          if (category.url == url) {
            return category;
          }
      }
    }
  },
  currentUser(state) {
    return state.user;
  }
}

// methods for sync operations
export const mutations = {
  cleanBucket(state) {
    if (state.bucket) {
      state.bucket.splice(0);
    }
  },
  addNewBucketItem(state, payload) {
    // Increasing same bucket item quantity if bucket item already exists in state.bucket
    // if not -> pushing new one in array
    let sameBucketItem = storeService.increaseSameBucketItemQuantity(state.bucket, payload);
    if (!sameBucketItem) {
      state.bucket.unshift(payload);
    }
    storeService.setLocalStorageBucket(state);
  },
  setProducts(state, payload) {
    state.products = payload.slice();
  },
  addProduct(state, payload) {
    state.products.push(payload);
  },
  updateProduct(state, payload) {
    state.products.forEach((product, index) => {
      if (product._id == payload._id) {
        state.products[index] = Object.assign({}, payload);
      }
     });
  },
  setCategories(state, payload) {
    state.categories = Object.assign([], payload);
  },
  setconcatCategories(state, payload) {
    state.concatCategories = Object.assign([], payload);
  },
  setOrders(state, payload) {
    state.orders = payload.slice();
  },
  removeItemFromBucketByIndex(state, payload) {
    if (state.bucket) {
      state.bucket.splice(payload.index, 1);
    }
  },
  icreaseBucketItemQuantity(state, payload) {
    state.bucket.forEach((item) => {
      if (item.product._id == payload.item.product._id && item.sizeIndex == payload.item.sizeIndex && item.colorIndex == payload.item.colorIndex) {
        item.quantity += payload.amount;
      }
    });
  },
  decreaseBucketItemQuantity(state, payload) {
    state.bucket.forEach((item) => {
      if (item.product._id == payload.item.product._id && item.sizeIndex == payload.item.sizeIndex && item.colorIndex == payload.item.colorIndex) {
        if (item.quantity > 0) {
          item.quantity += -payload.amount;
        }
      }
    });
  },
  setBucketItemQuantity(state, payload) {
    state.bucket.forEach((item) => {
      if (item.product._id == payload.item.product._id) {
        item.quantity = parseInt(payload.amount);
      }
    });
  },
  setUser(state, payload) {
    state.user = payload;
  },
  removeUser(state) {
    state.user = null;
  },
  addProductImages(state, payload) {
   state.products.forEach((product) => {
    if (product._id == payload.id) {
      product[payload.property].push('');
    }
   });
  },
  removeLastProductImages(state, payload) {
    state.products.forEach((product) => {
     if (product._id == payload.id) {
     product[payload.property].length > 1
        ? product[payload.property].splice(
          payload.index,
            1
          )
        : product[payload.property];
     }
    });
   }
};

// methods for async operations
export const actions = {
  async nuxtServerInit({
    commit
  }) {
    let [products, categories, orders, concatCategories] = await Promise.all([storeService.getProducts(), storeService.getCategories(), storeService.getOrders(), storeService.getConcatCategories()])
    commit('setCategories', categories.data);
    commit('setconcatCategories', concatCategories.data);
    commit('setProducts', products.data);
    commit('setOrders', orders.data);
  }
};