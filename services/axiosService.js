import axios from "~/plugins/axios";
export default {
  setDefaultHeader(token) {
    axios.defaults.headers.common['x-auth'] = token;
  }
}