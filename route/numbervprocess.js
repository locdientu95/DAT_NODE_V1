const DB = require("../models/item_model");

const getAll = () => {
  return new Promise(async (res, rej) => {
    try {
      await DB.NumberV.find({})
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

const add = (header, data, col) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.NumberV.findByIdAndUpdate("65716b42068b213b63a21923", {
        header: header,
        data: data,
        col: col,
      })
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

const deleteCol = (header, data) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.NumberV.findByIdAndUpdate("65716b42068b213b63a21923", {
        header: header,
        data: data,
      })
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

const update = (header) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.NumberV.findByIdAndUpdate("65716b42068b213b63a21923", {
        header: header,
      })
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

module.exports = {
  getAll,
  add,
  deleteCol,
  update,
};
