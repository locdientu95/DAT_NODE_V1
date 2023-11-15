const MD = require("../models/item_model")

const getAll=()=>{
    return new Promise(async(resolve, reject) => {
        try {
            await MD.Tablepro.find({})
            .then((data)=>{
                resolve({status:true, data:data})
            })
            .catch((error)=>{
                reject({status: false, mes:"DB Err"})
            })
        } catch (error) {
            reject({status:false, mes:error})
        }
    })
}

module.exports ={
    getAll
}