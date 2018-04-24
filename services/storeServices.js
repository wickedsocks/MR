const storeServices = {
  async getProducts(commit) {
    let products = await axios.get("/api/products");
    commit('setProducts', products.data);
  }
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

