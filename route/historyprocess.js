const MD = require("../models/item_model")
const XlsxPopulate = require("xlsx-populate")

const add=(id,code,data,date)=>{
    return new Promise(async(resolve, reject)=> {
        try {
            let newData = new MD.History({
                id:id,
                code:code,
                data:data,
                date:date
            });
            newData.save()
            .then((x)=>{
                console.log(x)
                resolve({status:true})
            }).catch((err)=>{
                console.log(err)
                resolve({status:false})
            })
        } catch (error) {
            reject({status:false, message:error})
        }
    })
}

const getData=(id,code,date)=>{
    return new Promise(async(resolve, reject) => {
        try {
            
           await MD.History.findOne({id:id} && {date:date} && {code:code})
            .then((data)=>{
                const arr =[]
                data.data.map((d,index)=>{
                    arr.push([d.time,d.val_1,d.val_2,d.val_3])
                })
                console.log("Hello",arr)
                resolve({status:true})
            }).catch((err)=>{
                console.log(err)
                reject({status:false, mes:err})
            })
        
        } catch (error) {
            reject({status:false})
        }
    })
}

const getAllData=()=>{
    return new Promise(async(resolve, reject) => {
        try {
           await MD.History.find({})
            .then((data)=>{
                const arr = []
                data.map((d,index)=>{
                    d.data.map((value,num)=>{
                        arr.push([
                            value.time,
                            value.val_1,
                            value.val_2,
                            value.val_3
                        ])
                    })
                })
                XlsxPopulate.fromFileAsync("")
                .then((workbook)=>{
                workbook.sheet(0).cell("A3").value(arr)
                return workbook.toFileAsync("")
                })
                resolve({status:true})
            }).catch((err)=>{
                console.log(err)
                reject({status:false, mes:err})
            })
        } catch (error) {
            reject({status:false})
        }
    })
}
module.exports={
    add,
    getData,
    getAllData
}