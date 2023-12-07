const DB = require("../models/item_model");

const getAll = () => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Lamp.find({})
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

const custom = (width, height, fontsize) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Lamp.findByIdAndUpdate("656ed6710ef0561b0db37890", {
        width: width,
        height: height,
        fontsize: fontsize,
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

const update = (value, text, color, bgcolor) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Lamp.findByIdAndUpdate("656ed6710ef0561b0db37890", {
        value: value,
        text: text,
        color: color,
        bgcolor: bgcolor,
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

const border = (border, borderradius, bordercolor) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Lamp.findByIdAndUpdate("656ed6710ef0561b0db37890", {
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

const posi = (posi) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Lamp.findByIdAndUpdate("656ed6710ef0561b0db37890", {
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

const deletee = (indexx) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Lamp.find({ index: indexx })
        .then((data) => {
          res({ status: true, data: data });
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
  update,
  posi,
  deletee,
};
