const DB = require("../../models/item_model");

const getAll = () => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Bar.find({})
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

const update = (
  min,
  max,
  color,
  scale,
  realdata,
  type,
  w,
  h,
  bgcolor,
  realdatacolor
) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Bar.findByIdAndUpdate("65712043d0477aebac73f236", {
        min: min,
        max: max,
        color: color,
        scale: scale,
        realdata: realdata,
        type: type,
        w: w,
        h: h,
        bgcolor: bgcolor,
        realdatacolor: realdatacolor,
      })
        .then((data) => {
          res({ status: true, data });
        })
        .catch((err) => {
          rej({ status: false, mess: "ERR" });
        });
    } catch (error) {
      rej({ status: false, mes: "SYS ERR" });
    }
  });
};

const line1 = (wi, he) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Bar.findByIdAndUpdate("65712043d0477aebac73f236", {
        w: wi,
        h: he,
      })
        .then((data) => {
          res({ status: true, data });
        })
        .catch((err) => {
          rej({ status: false, mess: "ERR" });
        });
    } catch (error) {
      rej({ status: false, mes: "SYS ERR" });
    }
  });
};

const min = (min) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Bar.findByIdAndUpdate("65712043d0477aebac73f236", {
        min: min
      })
        .then((data) => {
          res({ status: true, data });
        })
        .catch((err) => {
          rej({ status: false, mess: "ERR" });
        });
    } catch (error) {
      rej({ status: false, mes: "SYS ERR" });
    }
  });
};

module.exports = {
  getAll,
  update,
  line1,
  min,
};
