const DB = require("../models/item_model");

const getAll = () => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Gauge.find({})
        .then((u) => {
          res({ status: true, data: u });
        })
        .catch(() => {
          rej({ status: false, mes: "err" });
        });
    } catch (error) {
      rej({ status: false, mes: "err" });
    }
  });
};

const custom = (width, height, segment) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Gauge.findByIdAndUpdate("654b0212764d234c95975dca", {
        width: width,
        height: height,
        segment: segment,
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

module.exports = {
  getAll,
  custom,
};
