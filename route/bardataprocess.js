const MD = require("../models/item_model");

const bardata = () => {
    return new Promise(async (res, rej) => {
        try {
            await MD.bardata.find({})
            .then ((data)=>{
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

module.exports = {
    bardata,
}