const MD = require("../models/item_model");

const barchart = () => {
    return new Promise(async (res, rej) => {
        try {
            await MD.barchart.find({})
                .then((data) => {
                    res({ status: true, data: data })
                })
                .catch((err) => {
                    rej({ status: false })
                })
        } catch (error) {
            rej({ status: false, mes: "ERR" })
        }
    })
}

module.exports = {
    barchart,
}