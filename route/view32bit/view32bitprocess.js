const DB = require("../../models/item_model");

const getAll = () => {
  return new Promise(async (res, rej) => {
    try {
      let a = await DB.View32bit.find({})
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

const pushAllData = (
  fontSize,
  color,
  alignItems,
  justifyContent,
  width,
  height,
  borderRadius,
  backgroundColor,
  borderColor,
  display,
  val1,
  val2
) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.View32bit.findByIdAndUpdate("657ab7910835b6460f09fccc", {
        fontSize: fontSize,
        color: color,
        alignItems: alignItems,
        justifyContent: justifyContent,
        width: width,
        height: height,
        borderRadius: borderRadius,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        display: display,
        val1: val1,
        val2: val2,
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

module.exports = { getAll, pushAllData };
