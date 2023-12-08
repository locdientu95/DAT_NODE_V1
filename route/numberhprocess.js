const DB = require("../models/item_model");

const getAll = () => {
  return new Promise(async (res, rej) => {
    try {
      await DB.NumberH.find({})
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

const add = (data, row) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.NumberH.findByIdAndUpdate("65702c286753c9879ffe4a1c", {
        data: data,
        row: row,
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

const deleteRow = (data) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.NumberH.findByIdAndUpdate("65702c286753c9879ffe4a1c", {
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

const update = (data) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.NumberH.findByIdAndUpdate("65702c286753c9879ffe4a1c", {
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

module.exports = {
  getAll,
  add,
  deleteRow,
  update,
};
