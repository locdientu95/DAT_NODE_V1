const DB = require("../../models/item_model");

const getAll = () => {
  return new Promise(async (res, rej) => {
    try {
      let a = await DB.Switch.find({})
        .then((a) => {
          res({ status: true, mes: "cc", data: a });
        })
        .catch((err) => {
          rej({ status: false, mes: "err" });
        });
    } catch (error) {
      rej({ status: false, mes: "err" });
    }
  });
};

const pushAllData = (
  texton,
  textoff,
  bgon,
  bgoff,
  txtcoloron,
  txtcoloroff,
  textsize,
  w,
  h,
  border,
  borderradius,
  bordercolor,
  borderradiusicon
) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Switch.findByIdAndUpdate("655438340844faa386988e8d", {
        texton: texton,
        textoff: textoff,
        bgon: bgon,
        bgoff: bgoff,
        txtcoloron: txtcoloron,
        txtcoloroff: txtcoloroff,
        textsize: textsize,
        w: w,
        h: h,
        border: border,
        borderradius: borderradius,
        bordercolor: bordercolor,
        borderradiusicon: borderradiusicon,
      })
        .then((data) => {
          console.log(data);
          res({ status: true, data });
        })
        .catch((err) => {
          console.log(err);
          rej({ status: false, mes: "err" });
        });
    } catch (error) {
      rej({ status: false, mes: "SYS ERR" });
    }
  });
};

module.exports = { getAll, pushAllData };
