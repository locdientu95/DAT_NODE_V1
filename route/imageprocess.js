const MD = require("../models/item_model")

const upload=(base64)=>{
    return new Promise(async(resolve, reject) => {
        try {
            const img = await MD.ImageUpload.create({image:base64})
            .then((img)=>{
                if(img){
                    resolve({status: true})
                }
            })
            .catch((err)=>{
                resolve({status:false})
            })
            
        } catch (error) {
            reject({status:false, ERR:error})
        }
    })
}

const getImage=()=>{
    return new Promise(async(resolve, reject) => {
        try {
            await MD.ImageUpload.find({})
            .then((data)=>{
                resolve({status: true, data:data})
            })
            .catch((err)=>{
                reject({status: false})
            })
        } catch (error) {
            reject({status:false, ERR:error})
        }
    })
}

module.exports ={
    upload,
    getImage
}