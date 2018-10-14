import axios from "~/plugins/axios";
export default {
  async getProducts() {
    return axios.get("/api/products");
  },
  increaseSameBucketItemQuantity(bucketArray, product) {
    let sameBucketItem;
    bucketArray.forEach((item) => {
      if (item.product._id == product.product._id && item.sizeIndex == product.sizeIndex && item.colorIndex == product.colorIndex) {
        item.quantity += product.quantity;
        sameBucketItem = item;
      }
    });
    return sameBucketItem ? sameBucketItem : false;
  },
  setLocalStorageBucket(state) {
    // creating local storage data
    let localData = `${JSON.stringify(state.bucket)};`
    localStorage.setItem('mrbucket', localData);
    localStorage.setItem('bucketTime', new Date());
  },
  getLocalStorageItem(name) {
    const localCopy = localStorage.getItem(name);
    const removeLastColon = localCopy.slice(0, localCopy.length - 1);
    const parsedCopy = JSON.parse(removeLastColon);
    return parsedCopy;
  },
  removeLocalStorageBucket(name) {
    localStorage.removeItem(name);
  },
  cleanBucket(store) {
    if (store.bucket) {
      store.bucket.splice(0);
    }
  },
  setLocalStorageUser(user) {
    let localUser = `${JSON.stringify(user)};`
    localStorage.setItem('mrUser', localUser);
    localStorage.setItem('mrUserTime', new Date());
  },
  getLocalStorageUser() {
    const localUser = localStorage.getItem('mrUser');
    const removeLastColon = localUser.slice(0, localUser.length - 1);
    const parsedUser = JSON.parse(removeLastColon);
    return parsedUser;
  },
  async getCategories() {
    let [productCategory, manufactureCategory] = await Promise.all([axios.get("/api/categories/product"), axios.get("/api/categories/manufacture")]);
    return {
      productCategory: productCategory.data,
      manufactureCategory: manufactureCategory.data
    };
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
  }
};