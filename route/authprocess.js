const MD = require("../models/item_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const auth = () => {
  return new Promise(async (res, rej) => {
    try {
      await MD.Register.find({})
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

const addUser = (username, password, email, name, role) => {
  return new Promise(async (res, rej) => {
    try {
      var check = await MD.Register.findOne({ username: username });
      if (!check) {
        if (role == null || role != "admin") {
          role = "user";
        }
        let user = new MD.Register({
          username: username,
          password: password,
          email: email,
          name: name,
          role: role,
        });
        user
          .save()
          .then((data) => {
            res({ status: true, message: "User added!" });
          })

          .catch((err) => {
            console.log(err);
            rej({ status: false });
          });
      } else {
        res({
          status: false,
          message: "This username or email have been used!",
        });
      }
    } catch (error) {
      rej({ status: false, mes: "err" });
    }
  });
};

const upload = (base64) => {
  return new Promise(async (resolve, reject) => {
    try {
      const img = await MD.Register.create({ image: base64 })
        .then((img) => {
          if (img) {
            resolve({ status: true });
          }
        })
        .catch((err) => {
          resolve({ status: false });
        });
    } catch (error) {
      reject({ status: false, ERR: error });
    }
  });
};

const Login = (username, pass) => {
  return new Promise(async (resolve, reject) => {
    try {
      await MD.Register.findOne({ username: username })
        .then(async (user) => {
          if (user) {
            let isValid = await bcrypt.compare(pass, user.password);
            if (!isValid) {
              resolve({ status: false, mes: "Sai mật khẩu" });
              next();
            } else {
              const token = jwt.sign(
                {
                  id: user.username,
                  admin: user.role,
                },
                "MySecretKey",
                { expiresIn: "10s" }
              );
              const refreshToken = jwt.sign(
                {
                  id: user.username,
                  admin: user.role,
                },
                "MyRefreshSecretKey",
                { expiresIn: "30d" }
              );
              const { password, ...others } = user._doc;
              resolve({
                status: true,
                mes: "Đăng nhập thành công",
                ...others,
                token: token,
                rft: refreshToken,
              });
            }
          } else {
            resolve({ status: false, mes: "Không có username này" });
            next();
          }
        })
        .catch((err) => {
          reject({ status: false, mes: "DB ERR" });
        });
    } catch (error) {
      reject({ status: false, mes: err });
    }
  });
};

const UpdateImage = (username, base64) => {
  return new Promise(async (resolve, reject) => {
    try {
      await MD.Register.findOneAndUpdate(
        { username: username },
        { avatar: base64 }
      )
        .then((user) => {
          if (user) {
            resolve({ status: true, data: user });
          } else {
            resolve({ status: false });
          }
        })
        .catch((err) => {
          reject({ status: false });
        });
    } catch (error) {
      reject({ status: false, mes: "ERR" });
    }
  });
};

const getImage = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      await MD.Register.findOne({ username: username })
        .then((user) => {
          if (user) {
            resolve({ status: true, data: user });
          } else {
            resolve({ status: false });
          }
        })
        .catch((err) => {
          reject({ status: false });
        });
    } catch (error) {
      reject({ status: false, mes: "ERR" });
    }
  });
};

const deleteUser = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(username);
      await MD.Register.findOneAndDelete({ username: username })
        .then((data) => {
          console.log(data);
          resolve({ status: true, data: data });
        })
        .catch((err) => {
          reject({ status: false });
        });
    } catch (error) {
      reject({ status: false, mes: "ERR" });
    }
  });
};

const changePassword = (username, password) => {
  return new Promise(async (resolve, reject) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      await MD.Register.findOneAndUpdate(
        { username: username },
        { password: hashPassword }
      )
        .then(async (user) => {
          if (user) {
            resolve({ status: true, data: user });
          } else {
            resolve({ status: false });
          }
        })
        .catch((err) => {
          console.log("Hello", err);
          reject({ status: false });
        });
    } catch (error) {
      reject({ status: false, mes: "ERR" });
    }
  });
};

module.exports = {
  auth,
  addUser,
  Login,
  upload,
  UpdateImage,
  getImage,
  deleteUser,
  changePassword,
};
