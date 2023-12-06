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

const addRow=(id,data,row)=>{
    return new Promise(async(resolve, reject) => {
        try {
             await MD.Tablepro.findByIdAndUpdate(id,{data:data,row:row})
            .then((data)=>{
                resolve({status:true, data:data})
            })
            .catch((err)=>{
                console.log(err)
                reject({status: false, mes:"DB Err"})
            })
        } catch (error) {
            reject({status:false, mes:error})
        }
    })
}

const deleteRow =(id,data)=>{
    return new Promise(async(resolve, reject) => {
        try {
            await MD.Tablepro.findByIdAndUpdate(id,{data:data})
           .then((data)=>{
               resolve({status:true, data:data})
           })
           .catch((err)=>{
               console.log(err)
               reject({status: false, mes:"DB Err"})
           })
       } catch (error) {
           reject({status:false, mes:error})
       }
   })
}

const addCol=(id,data,head,col)=>{
    return new Promise(async(resolve, reject) => {
        console.log(data,head)
        try {
            await MD.Tablepro.findByIdAndUpdate(id,{data:data,head:head,col:col})
           .then((data)=>{
               resolve({status:true, data:data})
           })
           .catch((err)=>{
               console.log(err)
               reject({status: false, mes:"DB Err"})
           })
       } catch (error) {
           reject({status:false, mes:error})
       }
   })
}

const deleteCol=(id,data,head)=>{
    return new Promise(async(resolve, reject) => {
        try {
            await MD.Tablepro.findByIdAndUpdate(id,{data:data,head:head})
           .then((data)=>{
               resolve({status:true, data:data})
           })
           .catch((err)=>{
               console.log(err)
               reject({status: false, mes:"DB Err"})
           })
       } catch (error) {
           reject({status:false, mes:error})
       }
   })
}

const changeHead=(id,head)=>{
    return new Promise(async(resolve, reject) => {
        try {
            await MD.Tablepro.findByIdAndUpdate(id,{head:head})
           .then((data)=>{
               resolve({status:true, data:data})
           })
           .catch((err)=>{
               console.log(err)
               reject({status: false, mes:"DB Err"})
           })
       } catch (error) {
           reject({status:false, mes:error})
       }
   })
}

const changeValue=(id,data)=>{
    return new Promise(async(resolve, reject) => {
        try {
            await MD.Tablepro.findByIdAndUpdate(id,{data:data})
           .then((data)=>{
               resolve({status:true, data:data})
           })
           .catch((err)=>{
               console.log(err)
               reject({status: false, mes:"DB Err"})
           })
       } catch (error) {
           reject({status:false, mes:error})
       }
   })
}
module.exports ={
    getAll,
    addRow,
    deleteRow,
    addCol,
    deleteCol,
    changeHead,
    changeValue
}