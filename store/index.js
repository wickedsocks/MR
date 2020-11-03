import storeService from './../services/storeServices';

export const state = () => ({
  bucket: [],
  products: [],
  categories: [],
  concatCategories: [],
  orders: [],
  user: null,
  // Узнаю количество товаров в базе
  // Берем количество товаров на странице
  // Делим базу на количество, получаем количество страниц
  // Если меняется лимит товаров нужно изменять и оффсет и количество страниц пагинации
  // и подтягивать с базы недостоющее количество
  productsCount: 0,
  productsOffset: 0,
  productsLimit: 10,
  paginationPagesCount: 0,
  activePage: 1
});

// Like a computed properties
export const getters = {
  getProducts(state) {
    return state.products;
  },
  getProductsOffset(state) {
    return state.productsOffset;
  },
  paginationPagesCount(state) {
    return state.paginationPagesCount;
  },
  productsCount(state) {
    return state.productsCount;
  },
  productsLimit(state) {
    return state.productsLimit;
  },
  bucketLength(state) {
    return state.bucket.length;
  },
  getProductById(state) {
    return id => state.products.find(item => item._id == id);
  },
  getProductByUrl(state) {
    return (url => {
      if (state && state.products && state.products.length > 0 ) {
       return state.products.find(item => item.url == url); 
      } else {
        return null;
      }
    });
  },
  totalBucketPrice(state) {
    let price = 0;
    state.bucket.forEach(item => {
      price +=
        item.product.productProperties[item.sizeIndex].price * item.quantity;
    });
    return price;
  },
  getCategoryById(state) {
    return id => {
      return state.categories.find(item => {
        if (item._id == id) {
          return item;
        }
      });
    };
  },
  getConcatCategoryById(state) {
    return id => {
      return state.concatCategories.find(item => {
        if (item._id == id) {
          return item;
        }
      });
    };
  },
  getCategoriesByName(state) {
    return name => {
      return state.categories.find(item => {
        if (item.name == name) {
          return item;
        }
      });
    };
  },
  getCategoryByUrl(state) {
    return url => {
      for (const key in state.categories) {
        const category = state.categories[key];
        if (category.url == url) {
          return category;
        }
      }
    };
  },
  currentUser(state) {
    return state.user;
  },
  getActivePage(state) {
    return state.activePage;
  },
};

// methods for sync operations
export const mutations = {
  cleanBucket(state) {
    if (state.bucket) {
      state.bucket.splice(0);
    }
  },
  addNewBucketItem(state, product) {
    // Increasing same bucket item quantity if bucket item already exists in state.bucket
    // if not -> pushing new one in array
    let sameBucketItem = storeService.increaseSameBucketItemQuantity(
      state.bucket,
      product
    );
    storeService.setInBucketFlagTrue(product);
    if (!sameBucketItem) {
      state.bucket.unshift(product);
    }
    storeService.setLocalStorageBucket(state);
  },
  setProducts(state, payload) {
    state.products = payload.slice();
  },
  pushProducts(state, payload) {
    payload.forEach((item) => {
      state.products.push(item);
    });
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
    state.bucket.forEach(item => {
      if (
        item.product._id == payload.item.product._id &&
        item.sizeIndex == payload.item.sizeIndex &&
        item.colorIndex == payload.item.colorIndex
      ) {
        item.quantity += payload.amount;
      }
    });
  },
  decreaseBucketItemQuantity(state, payload) {
    state.bucket.forEach(item => {
      if (
        item.product._id == payload.item.product._id &&
        item.sizeIndex == payload.item.sizeIndex &&
        item.colorIndex == payload.item.colorIndex
      ) {
        if (item.quantity > 0) {
          item.quantity += -payload.amount;
        }
      }
    });
  },
  setBucketItemQuantity(state, payload) {
    state.bucket.forEach(item => {
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
    state.products.forEach(product => {
      if (product._id == payload.id) {
        product[payload.property].push('');
      }
    });
  },
  removeLastProductImages(state, payload) {
    state.products.forEach(product => {
      if (product._id == payload.id) {
        product[payload.property].length > 1
          ? product[payload.property].splice(payload.index, 1)
          : product[payload.property];
      }
    });
  },
  setProductsCount(state, payload) {
    state.productsCount = payload;
  },
  setProductsLimit(state, payload) {
    state.productsLimit = payload;
  },
  setPaginationPagesCount(state, payload) {
    state.paginationPagesCount = payload;
  },
  setActivePage(state, payload) {
    state.activePage = payload;
  },
  setNewProductsOffset(state, payload) {
    state.productsOffset = payload;
  }
};

// methods for async operations
export const actions = {
  async nuxtServerInit({ commit, state }) {
    let [products, categories, orders, concatCategories] = await Promise.all([
      storeService.getPaginationProducts(state.productsOffset, state.productsLimit),
      storeService.getCategories(),
      storeService.getOrders(),
      storeService.getConcatCategories()
    ]);
    var PagesCount  = Math.ceil(products.data.count / state.productsLimit);
    commit('setCategories', categories.data);
    commit('setconcatCategories', concatCategories.data);
    commit('setProducts', products.data.products);
    commit('setNewProductsOffset', state.products.length);
    commit('setProductsCount', products.data.count);
    commit('setPaginationPagesCount', PagesCount);
    commit('setOrders', orders.data);
  }
};
