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

const tit = (label, labelsize, labelcolor) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Gauge.findByIdAndUpdate("654b0212764d234c95975dca", {
        label: label,
        labelsize: labelsize,
        labelcolor: labelcolor,
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

const unit = (unit, valuesize, valuecolor) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Gauge.findByIdAndUpdate("654b0212764d234c95975dca", {
        unit: unit,
        valuesize: valuesize,
        valuecolor: valuecolor,
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
      await DB.Gauge.findByIdAndUpdate("654b0212764d234c95975dca", {
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
      await DB.Gauge.findByIdAndUpdate("654b0212764d234c95975dca", {
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

const color = (needlecolor, startcolor, endcolor) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Gauge.findByIdAndUpdate("654b0212764d234c95975dca", {
        needlecolor: needlecolor,
        startcolor: startcolor,
        endcolor: endcolor,
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
  tit,
  unit,
  min,
  max,
  color,
};
