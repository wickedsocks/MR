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
  },
  totalOrderPrice(state) {
    let price = 0;
    state.orders.forEach((item) => {
      price += item.product.price * item.quantity;
    });
    return price;
  }
}

// methods for sync operations
export const mutations = {
  addNewOrder(state, payload) {
    // Increasing same order quantity if order already exists in state.orders
    // if not -> pushing new one in array
    let sameOrder = increaseSameOrderQuantity(state.orders, payload);
    if (!sameOrder) {
      state.orders.push(payload);
    }
    setCookieOrders(state);
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
    await getProducts(commit);
  }
};
