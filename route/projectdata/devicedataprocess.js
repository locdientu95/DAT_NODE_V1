const DB = require("../../models/item_model");

const getAll = (bu, user) => {
  return new Promise(async (res, rej) => {
    try {
      let a = await DB.Devicedata.find({ bu: bu, user: user })
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

module.exports = { getAll };
