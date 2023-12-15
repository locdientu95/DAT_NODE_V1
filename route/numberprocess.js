// const DB = require("../models/item_model");

// const getAll = () => {
//   return new Promise(async (res, rej) => {
//     try {
//       await DB.haha.find({}).then((data) => {
//         console.log(data);
//       });
//       res({ status: true });
//     } catch (error) {
//       rej({ status: false, mes: error });
//     }
//   });
// };

// // const custom = (width, height, unit) => {
// //   return new Promise(async (res, rej) => {
// //     try {
// //       await DB.NumberS.findByIdAndUpdate("656ec8ff0ef0561b0db37886", {
// //         width: width,
// //         height: height,
// //         unit: unit,
// //       })
// //         .then((data) => {
// //           console.log(data);
// //           res({ status: true, data });
// //         })
// //         .catch((err) => {
// //           console.log(err);
// //           rej({ status: false, mes: "err" });
// //         });
// //     } catch (error) {
// //       rej({ status: false, mes: "SYS ERR" });
// //     }
// //   });
// // };

// // const border = (border, borderradius, bordercolor) => {
// //   return new Promise(async (res, rej) => {
// //     try {
// //       await DB.NumberS.findByIdAndUpdate("656ec8ff0ef0561b0db37886", {
// //         border: border,
// //         borderradius: borderradius,
// //         bordercolor: bordercolor,
// //       })
// //         .then((data) => {
// //           res({ status: true, data });
// //         })
// //         .catch((err) => {
// //           rej({ status: false, mess: "ERR" });
// //         });
// //     } catch (error) {
// //       rej({ status: false, mes: "SYS ERR" });
// //     }
// //   });
// // };

// // const text = (fontsize, bgcolor, textcolor) => {
// //   return new Promise(async (res, rej) => {
// //     try {
// //       await DB.NumberS.findByIdAndUpdate("656ec8ff0ef0561b0db37886", {
// //         fontsize: fontsize,
// //         bgcolor: bgcolor,
// //         textcolor: textcolor,
// //       })
// //         .then((data) => {
// //           res({ status: true, data });
// //         })
// //         .catch((err) => {
// //           rej({ status: false, mess: "ERR" });
// //         });
// //     } catch (error) {
// //       rej({ status: false, mes: "SYS ERR" });
// //     }
// //   });
// // };

// // const posi = (posi) => {
// //   return new Promise(async (res, rej) => {
// //     try {
// //       await DB.NumberS.findByIdAndUpdate("656ec8ff0ef0561b0db37886", {
// //         posi: posi,
// //       })
// //         .then((data) => {
// //           res({ status: true, data });
// //         })
// //         .catch((err) => {
// //           rej({ status: false, mess: "ERR" });
// //         });
// //     } catch (error) {
// //       rej({ status: false, mes: "SYS ERR" });
// //     }
// //   });
// // };

// // const type = (type) => {
// //   return new Promise(async (res, rej) => {
// //     try {
// //       await DB.NumberS.findByIdAndUpdate("656ec8ff0ef0561b0db37886", {
// //         type: type,
// //       })
// //         .then((data) => {
// //           res({ status: true, data });
// //         })
// //         .catch((err) => {
// //           rej({ status: false, mess: "ERR" });
// //         });
// //     } catch (error) {
// //       rej({ status: false, mes: "SYS ERR" });
// //     }
// //   });
// // };

// module.exports = {
//   getAll,
// };
