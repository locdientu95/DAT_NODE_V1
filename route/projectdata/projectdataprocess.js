const DB = require("../../models/item_model");

const getAll = (bu, user) => {
  return new Promise(async (res, rej) => {
    try {
      let a = await DB.Projectdata.find({ bu: bu, user: user })
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

const add = (
  projectid,
  name,
  company,
  info,
  statement,
  custom,
  long,
  lat,
  bu,
  user
) => {
  return new Promise(async (res, rej) => {
    try {
      let a = await DB.Projectdata.create({
        projectid: projectid,
        name: name,
        company: company,
        info: info,
        statement: statement,
        custom: custom,
        long: long,
        lat: lat,
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

module.exports = {
  getAll,
  add,
};
