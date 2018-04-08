import Vue from "vue";

Vue.filter("limitTo", function(value, length) {
  if (!value) return "";
  value = value.toString();
  return value.substring(0, length);
});
