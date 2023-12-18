const DB = require("../../models/item_model");

const getAll = () => {
  return new Promise(async (res, rej) => {
    try {
      let a = await DB.Button.find({})
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

const line1 = (width, height, borderradius) => {
  return new Promise(async (res, rej) => {
    try {
      await DB.Button.findByIdAndUpdate("656fe0ef6a1c976bfd1c16b1", {
        w: width,
        h: height,
        radius: borderradius,
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

const line2 = (backgroundon, texton, fontsizeon, textcoloron) => {
    return new Promise(async (res, rej) => {
      try {
        await DB.Button.findByIdAndUpdate("656fe0ef6a1c976bfd1c16b1", {
          bgon: backgroundon,
          texton: texton,
          sizeon: fontsizeon,
          txtcoloron: textcoloron,
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

const line3 = (backgroundoff, textoff, fontsizeoff, textcoloroff) => {
    return new Promise(async (res, rej) => {
        try {
          await DB.Button.findByIdAndUpdate("656fe0ef6a1c976bfd1c16b1", {
            bgoff: backgroundoff,
            textoff: textoff,
            sizeoff: fontsizeoff,
            txtcoloroff: textcoloroff,
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

const line4 = (type) =>{
    return new Promise(async (res, rej) => {
        try {
          await DB.Button.findByIdAndUpdate("656fe0ef6a1c976bfd1c16b1", {
            type: type,
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
}

module.exports = {
  getAll,
  line1,
  line2,
  line3,
  line4,
};
