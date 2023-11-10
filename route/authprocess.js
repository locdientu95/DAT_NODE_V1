const MD = require("../models/item_model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const auth = () => {
    return new Promise(async(res, rej) => {
        try {
            await MD.Register.find({})
            .then((data)=>{
                res({status:true, data:data})
            })
            .catch((err)=>{
                rej({status:false})
            })
        } catch (error) {
            rej({status:false,mes:"ERR"})
        }
    })
}
const addUser = (username,password,email,name,role) => {
    return new Promise(async (res, rej) => {
        try {
            if (role==null || role !="admin"){
                role="user"
            }
            let user = new MD.Register({username:username,password:password,email:email,name:name,role:role})
            user.save()

                .then((data) => {
                    res({ status: true })
                })

                .catch((err) => {
                    rej({ status: false, mes: "DB ERR" })
                })

        } catch (error) {
            rej({ status: false, mes: "err" })
        }
    })
}

// const Login = async (name, pass) => {
//     try {
//         console.log(name, pass);

//         const user = await MD.Register.findOne({ username: name });

//         if (user) {
//             const valid = await user.isCheckPassword(pass);

//             if (valid) {
//                 console.log(valid);
//                 return { status: true, mes: "Hello", data: user };
//             } else {
//                 return { status: false, mes: "Sai" };
//             }
//         } else {
//             return { status: false, mes: "Không tìm thấy tài khoản" };
//         }
//     } catch (error) {
//         return { status: false, mes: "Lỗi" };
//     }
// };

// const Login = (name, pass) => {
//     return new Promise((resolve, reject) => {
//         console.log(name, pass);

//         MD.Register.findOne({ username: name })
//             .then((user) => {
//                 if (user) {
//                     checkPassword(user, pass)
//                         .then((valid) => {
//                             if (valid) {
//                                 console.log(valid);
//                                 resolve({ status: true, mes: "Hello", data: user });
//                             } else {
//                                 reject({ status: false, mes: "Sai" });
//                             }
//                         })
//                         .catch((error) => {
//                             reject({ status: false, mes: "Lỗi" });
//                         });
//                 } else {
//                     reject({ status: false, mes: "Không tìm thấy tài khoản" });
//                 }
//             })
//             .catch((error) => {
//                 reject({ status: false, mes: "Lỗi" });
//             });
//     });
// };

// const checkPassword = (user, pass) => {
//     return new Promise((resolve, reject) => {
//         user.isCheckPassword(pass)
//             .then((valid) => {
//                 resolve(valid);
//             })
//             .catch((error) => {
//                 reject(error);
//             });
//     });
// };

const Login = (username, pass) => {
    return new Promise(async (resolve, reject) => {
        try {
             await MD.Register.findOne({ username: username })
                .then(async (user) => {
                    console.log(user)
                    if (user) {
                        let isValid = await bcrypt.compare(pass, user.password)
                        console.log(isValid)
                        if (!isValid) {
                            resolve({ status: false, mes: "Sai mật khẩu" })
                        } else {
                          const token =  jwt.sign({
                                id:user.username,
                                admin: user.role
                            },
                            "MySecretKey",
                            {expiresIn:"10s"}
                            );
                            const refreshToken = jwt.sign({
                                id:user.username,
                                admin: user.role
                            },
                            "MyRefreshSecretKey",
                            {expiresIn:"30d"}
                            )
                             const {password,...others} = user._doc;
                            resolve({ status: true, mes: "Đăng nhập thành công", ...others, token:token,rft:refreshToken })
                        }
                    } else {
                        resolve({ status: false, mes: "Không có username này" })
                    }
                })
                .catch((err) => {
                    reject({ status: false, mes: "DB ERR" })
                })
            } catch (error) {
            reject({status:false, mes:err})
            }
    })
}

module.exports = {
    auth,
    addUser,
    Login
}