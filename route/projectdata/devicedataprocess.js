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

const add = (name, description, custom, statement, gateway, bu, user) => {
  return new Promise(async (res, rej) => {
    try {
      let a = await DB.Devicedata.create({
        name: name,
        description: description,
        custom: custom,
        statement: statement,
        gateway: gateway,
        bu: bu,
        user: user,
      })
        .then((a) => {
          res({ status: true, mes: "cc", data: a });
        })
        .catch((err) => {
          console.log(err);
          rej({ status: false });
        });
    } catch (error) {
      console.log(error);
      rej({ status: false });
    }
  });
};

module.exports = { getAll, add };
