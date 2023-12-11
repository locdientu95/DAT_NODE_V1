const DB = require("../models/item_model");

const getAll = () => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Num.find({})
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

const custom = (width, height, unit) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Num.findByIdAndUpdate("6576b14d2a7b5e9ce0145aa6", {
        width: width,
        height: height,
        unit: unit,
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

const border = (border, borderradius, bordercolor) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Num.findByIdAndUpdate("6576b14d2a7b5e9ce0145aa6", {
        border: border,
        borderradius: borderradius,
        bordercolor: bordercolor,
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

const text = (fontsize, bgcolor, textcolor) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Num.findByIdAndUpdate("6576b14d2a7b5e9ce0145aa6", {
        fontsize: fontsize,
        bgcolor: bgcolor,
        textcolor: textcolor,
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

const posi = (posi) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Num.findByIdAndUpdate("6576b14d2a7b5e9ce0145aa6", {
        posi: posi,
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

const type = (type) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Num.findByIdAndUpdate("6576b14d2a7b5e9ce0145aa6", {
        type: type,
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
  custom,
  border,
  text,
  posi,
  type,
};
