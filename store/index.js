import axios from "~/plugins/axios";
export const state = () => ({
  orders: [],
  products: []
});

// Like a computed properties
export const getters = {
  ordersLength(state) {
    return state.orders.length;
  },
  getSpecifiedProduct(state) {
    return (id) => state.products.find((item) => item._id == id);
  }
}

// methods for sync operations
export const mutations = {
  addNewOrder(state, payload) {
    state.orders.push(payload);
  },
  setProducts(state, payload) {
    state.products = payload.slice();
  }
};

// methods for async operations
export const actions = {
  async nuxtServerInit ({ commit }) {
      let products = await axios.get("/api/products");
        commit('setProducts', products.data);
    }
};
