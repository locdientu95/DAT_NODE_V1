const MD = require("../models/item_model")


const getData=()=>{
    return new Promise(async(resolve, reject) => {
        try {
            await MD.ErrSetting.find({})
            .then((data)=>{
                resolve({status:true, data:data})
            }).catch((err)=>{
                reject({status:false, mess:err})
            })
        } catch (error) {
            reject({status:false, mess:error})
        }
    })
}

const saveInfo=(_id,infodata)=>{
    return new Promise(async(resolve, reject) => {
        try {
            await MD.ErrSetting.findByIdAndUpdate(_id,{infodata:infodata})
            .then((data)=>{
                resolve({status:true, mess:"Successful"})
            }).catch((err)=>{
                reject({status:false, mess:err})
            })
        } catch (error) {
            reject({status:false, mess:error})
        }
    })
}

const addInfo=(_id,infodata,infoDataRow)=>{
    return new Promise(async(resolve, reject) => {
        try {
            await MD.ErrSetting.findByIdAndUpdate(_id,{infodata:infodata,infoDataRow:infoDataRow})
            .then((data)=>{
                resolve({status:true, mess:"Successful"})
            }).catch((err)=>{
                reject({status:false, mess:err})
            })
        } catch (error) {
            reject({status:false, mess:error})
        }
    })
}

const deleteInfo=(_id,infodata)=>{
    return new Promise(async(resolve, reject) => {
        try {
            await MD.ErrSetting.findByIdAndUpdate(_id,{infodata:infodata})
            .then((data)=>{
                resolve({status:true, mess:"Successful"})
            }).catch((err)=>{
                reject({status:false, mess:err})
            })
        } catch (error) {
            reject({status:false, mess:error})
        }
    })
}

const addAddress=(_id,adddata,addDataRow)=>{
    return new Promise(async(resolve, reject) => {
        try {
            await MD.ErrSetting.findByIdAndUpdate(_id,{adddata:adddata,addDataRow:addDataRow})
            .then((data)=>{
                resolve({status:true, mess:"Successful"})
            }).catch((err)=>{
                reject({status:false, mess:err})
            })
        } catch (error) {
            reject({status:false, mess:error})
        }
    })
}

const saveAddress=(_id,adddata)=>{
    return new Promise(async(resolve, reject) => {
        try {
            await MD.ErrSetting.findByIdAndUpdate(_id,{adddata:adddata})
            .then((data)=>{
                resolve({status:true, mess:"Successful"})
            }).catch((err)=>{
                reject({status:false, mess:err})
            })
        } catch (error) {
            reject({status:false, mess:error})
        }
    })
}

const deleteAddress=(_id,adddata)=>{
    return new Promise(async(resolve, reject) => {
        try {
            await MD.ErrSetting.findByIdAndUpdate(_id,{adddata:adddata})
            .then((data)=>{
                resolve({status:true, mess:"Successful"})
            }).catch((err)=>{
                reject({status:false, mess:err})
            })
        } catch (error) {
            reject({status:false, mess:error})
        }
    })
}

module.exports={
    getData,
    saveInfo,
    addInfo,
    deleteInfo,
    addAddress,
    saveAddress,
    deleteAddress
}