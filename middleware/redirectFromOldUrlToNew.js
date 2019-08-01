import axios from "~/plugins/axios";
export default function({ route, redirect }) {
  let path = route.path;
  let id = route.params.id;
  console.log('123');
  return axios.get(`/api/product?url=${id}`).then(() => {
    return path;
  }, (err) => {
    console.log('err', err);
    return axios.get(`/api/product?redirect_url=${id}`).then((product) => {
      let arrPath = path.split('/');
      arrPath[arrPath.length - 1] = product.data[0].url;
      let newPath = arrPath.join('/');
      console.log('newPath ', newPath);
      return redirect(301, newPath);
    }, (err) => {
      console.log('err', err);
      return null;
    });
  });
}
