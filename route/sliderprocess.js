const DB = require("../models/item_model");

const getAll = () => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Slider.find({})
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

const custom = (width, height, scale) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Slider.findByIdAndUpdate("654c9e500e7b79ac12d4bbe9", {
        width: width,
        height: height,
        scale: scale,
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

const min = (min) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Slider.findByIdAndUpdate("654c9e500e7b79ac12d4bbe9", {
        min: min,
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

const max = (max) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Slider.findByIdAndUpdate("654c9e500e7b79ac12d4bbe9", {
        max: max,
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

const ori = (ori) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Slider.findByIdAndUpdate("654c9e500e7b79ac12d4bbe9", {
        ori: ori,
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
  min,
  max,
  ori,
};
