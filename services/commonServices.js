export default {
  copyObjectThroughJSON(object) {
    return JSON.parse(JSON.stringify(object));
  },
  removeSpacesFromString(str) {
    return str.replace(/\s/g, '');
  },
  showLoader() {
    return true;
  },
  hideLoader() {
    return false;
  }
}