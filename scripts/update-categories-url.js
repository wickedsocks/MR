// require('../dbconfig/config');
// require('../db/mongoose');
// // const convert = require('cyrillic-to-latin');
// // FIXME: change convert libruary to valid function
// const { CategoryProduct, CategoryManufacture } = require('../models/category');

// async function updateCategories() {
//   let promiseAll = [];
//   promiseAll.push(
//     await CategoryProduct.find({})
//     // await CategoryProduct.updateMany({}, { $set: { used: false } })
//   );
//   promiseAll.push(
//     await CategoryManufacture.find({})
//     // await CategoryManufacture.updateMany({}, { $set: { used: false } })
//   );
//   const [product, manufacture] = await Promise.all(promiseAll);
//   const resultArray = [];
//   product.forEach(category => {
//     let urlArr = category.url.split('_');
//     let url = urlArr.slice(0, urlArr.length - 1);
//     resultArray.push(
//       CategoryProduct.findOneAndUpdate(
//         { _id: category._id },
//         { $set: { url } }
//       )
//     );
//   });
//   manufacture.forEach(category => {
//     let urlArr = category.url.split('_');
//     let url = urlArr.slice(0, urlArr.length - 1);
//     resultArray.push(
//       CategoryManufacture.findOneAndUpdate(
//         { _id: category._id },
//         { $set: { url } }
//       )
//     );
//   });
//   const result = await Promise.all(resultArray);
//   console.log('result ', result);
// }

// updateCategories();
