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


// Reusable functions
async function getProducts(commit) {
  let products = await axios.get("/api/products");
  commit('setProducts', products.data);
}

function increaseSameOrderQuantity(ordersArray, product) {
  let sameOrder;
  ordersArray.forEach((order) => {
    if (order.product._id == product.product._id) {
      order.quantity += product.quantity;
      sameOrder = order;
    }
  });
  return sameOrder ? sameOrder : false;
}

function setCookieOrders(state) {
  // Setting expiring date to one day
  let date = new Date;
  date.setDate(date.getDate() + 1);
  let cookieExpireDate = `expires=${date.toUTCString()};`;
  let cookieData = `mrorders=${JSON.stringify(state.orders)};`
  // Setting cookie
  document.cookie = cookieData + cookieExpireDate;
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([$?*|{}\\^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}