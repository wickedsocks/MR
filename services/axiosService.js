import axios from "~/plugins/axios";
export default {
  setDefaultHeader(token) {
    axios.defaults.headers.common['x-auth'] = token;
  },
  updateCategories(data) {
    return axios.post('/api/categories/update', {
      categories: data
    });
  },
  createCategory(data) {
    return axios.post('/api/categories', data);
  }
}