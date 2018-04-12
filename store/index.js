export const state = () => ({
  orders: []
});

// Like a computed properties
export const getters = {
  ordersLength(state) {
    return state.orders.length;
  }
}

// methods for sync operations
export const mutations = {
  addNewOrder(state, payload) {
    state.orders.push(payload);
  }
};

// methods for async operations
export const actions = {};
