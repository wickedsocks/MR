import axios from "~/plugins/axios";
export default {
  async getProducts() {
    return axios.get("/api/products");
  },
  increaseSameBucketItemQuantity(bucketArray, product) {
    let sameBucketItem;
    bucketArray.forEach((item) => {
      if (item.product._id == product.product._id) {
        item.quantity += product.quantity;
        sameBucketItem = item;
      }
    });
    return sameBucketItem ? sameBucketItem : false;
  },
  setCookieBucket(state) {
    // Setting expiring date to one day
    let date = new Date;
    date.setDate(date.getDate() + 1);
    let cookieExpireDate = `expires=${date.toUTCString()};`;
    let cookieData = `mrbucket=${JSON.stringify(state.bucket)};`
    // Setting cookie
    document.cookie = cookieData + cookieExpireDate;
  },
  getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([$?*|{}\\^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  },
  removeCookie(name) {
    let date = new Date(0);
    document.cookie = `${name}=;expires=${date.toUTCString()}`;
  },
  cleanBucket(store){
    store.bucket.splice(0);
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
  }
};