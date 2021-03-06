import axios from '~/plugins/axios';
export default {
  async getProducts() {
    return axios.get('/api/products');
  },
  async getPaginationProducts(skip, limit) {
    return axios.post('/api/pagination/products', { skip, limit });
  },
  increaseSameBucketItemQuantity(bucketArray, product) {
    let sameBucketItem;
    bucketArray.forEach(item => {
      if (
        item.product._id == product.product._id &&
        item.sizeIndex == product.sizeIndex &&
        item.colorIndex == product.colorIndex
      ) {
        item.quantity += product.quantity;
        sameBucketItem = item;
      }
    });
    return sameBucketItem ? sameBucketItem : false;
  },
  setInBucketFlagTrue(item) {
    item.product.inBucket = true;
  },
  setLocalStorageBucket(state) {
    // creating local storage data
    let localData = `${JSON.stringify(state.bucket)};`;
    localStorage.setItem('mrbucket', localData);
    localStorage.setItem('bucketTime', new Date());
  },
  getLocalStorageItem(name) {
    const localCopy = localStorage.getItem(name);
    const removeLastColon = localCopy
      ? localCopy.slice(0, localCopy.length - 1)
      : null;
    const parsedCopy = JSON.parse(removeLastColon);
    return parsedCopy;
  },
  removeLocalStorageBucket(name) {
    localStorage.removeItem(name);
  },
  setLocalStorageUser(user) {
    let localUser = `${JSON.stringify(user)};`;
    localStorage.setItem('mrUser', localUser);
    localStorage.setItem('mrUserTime', new Date());
  },
  removeLocalStorageUser() {
    localStorage.removeItem('mrUser');
    localStorage.removeItem('mrUserTime');
  },
  getLocalStorageUser() {
    const localUser = localStorage.getItem('mrUser');
    const removeLastColon = localUser
      ? localUser.slice(0, localUser.length - 1)
      : null;
    const parsedUser = JSON.parse(removeLastColon);
    return parsedUser;
  },
  async getCategories() {
    let categories = await axios.get('/api/categories');
    return categories;
  },
  async getConcatCategories() {
    let categories = await axios.get('/api//merge-categoires');
    return categories;
  },
  async getOrders() {
    return await axios.get('/api/orders');
  },
  async searchProductsByTitle(title) {
    return await axios.get('/api/products/search', {
      params: {
        title
      }
    });
  },
  async getCategoryProducts(url) {
    return await axios.get('/api/category/products', {
      params: {
        url
      }
    });
  },
  setProductsCount(store, val) {
    store.commit('changeProductCount', val);
  },
  changeProductsLimit(store, val) {
    store.commit('setProductsLimit', val);
  },
  setActivePage(store, val) {
    store.commit('setActivePage', val);
  },
  pushProducts(store, val) {
    store.commit('pushProducts', val);
  },
  updateProductsOffset(store, val) {
    store.commit('setNewProductsOffset', val);
  },
  filledBucketFromLocalStorage(store, bucketArray) {
    bucketArray.forEach(bucketItem => {
      store.commit('addNewBucketItem', bucketItem);
    });
  },
  makeProductsConsistentWithBucket(store, bucketArray) {
    bucketArray.forEach(item => {
      store.state.products.forEach(product => {
        if (item.product._id == product._id) {
          product.inBucket = true;
        }
      });
    });
    store.commit('setProducts', store.state.products);
  }
};
