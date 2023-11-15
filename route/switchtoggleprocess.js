const MD = require("../models/item_model");

const switchtoggle = () => {
    return new Promise(async (res, rej) => {
        try {
            await MD.SwitchToggle.find({})
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

module.exports = {
    switchtoggle
}