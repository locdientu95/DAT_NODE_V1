const MD = require("../models/item_model")

const getData = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await MD.ErrorLogs.find({})
                .then((data) => {
                    resolve({ status: true, data: data })
                }).catch((err) => {
                    reject({ status: false, mess: err })
                })
        } catch (error) {
            reject({ status: false, mess: error })
        }
    })
}

const deleteData = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await MD.ErrorLogs.findOneAndDelete({ id: id })
                .then((data) => {
                    resolve({ status: true, mess: "Successful" })
                }).catch((err) => {
                    console.log(err)
                    reject({ status: false, mess: err })
                })
        } catch (error) {
            console.log(error)
            reject({ status: false, mess: error })
        }
    })
}

module.exports = {
    getData,
    deleteData
}