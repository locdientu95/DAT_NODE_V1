const MD = require("../models/item_model");

const getAll = () => {
  return new Promise(async (res, rej) => {
    try {
      await MD.Device.find({})
        .then((data) => {
          res({ status: true, data: data });
        })
        .catch((err) => {
          rej({ status: false });
        });
    } catch (error) {
      rej({ status: false, mes: "ERR" });
    }
  });
};
const addDevice = (id, name, des, status) => {
  return new Promise(async (res, rej) => {
    try {
      let device = new MD.Device({
        deviceid: id,
        name: name,
        des: des,
        status: status,
      });
      device
        .save()
        .then((data) => {
          res({ status: true });
        })
        .catch((err) => {
          rej({ status: false, mes: "DB ERR" });
        });
    } catch (error) {
      rej({ status: false, mes: "err" });
    }
  });
};

const updateAtId = (id, name, des, status) => {
  return new Promise(async (res, rej) => {
    try {
      await MD.Device.findOneAndUpdate(
        { deviceid: id },
        { name: name, des: des, status: status }
      )
        .then((data) => {
          if (data == null) {
            res({ status: false, mes: "ID not found" });
          } else {
            res({ status: true });
          }
        })
        .catch((err) => {
          console.log(err);
          rej({ status: false, mes: "DB ERR" });
        });
    } catch (error) {
      rej({ status: false, mes: "SYS ERR" });
    }
  });
};

const deleteDevice = (id) => {
  return new Promise(async (res, rej) => {
    try {
      await MD.Device.findOneAndDelete({ deviceid: id })
        .then((data) => {
          console.log(data);
          res({ status: true, mes: "Deleted" });
        })
        .catch((err) => {
          rej({ status: false });
        });
    } catch (error) {
      rej({ status: false, mes: "Err" });
    }
  });
};

// const replaceinData=(id)=>{
//     return new Promise(async(res,rej)=>{
//         try {
//             await MD.Device.findOneAndReplace({deviceid:id})
//             .then((data)=>{
//                 console.log(data)
//                 res({status:true,mes:"Successful"})
//             })
//             .catch((err)=>{
//                 rej({status:false})
//             })
//         } catch (error) {
//             rej({status:false, mes:"ERR"})
//         }
//     })
// }

module.exports = {
  addDevice,
  updateAtId,
  deleteDevice,
  // replaceinData,
  getAll,
};
