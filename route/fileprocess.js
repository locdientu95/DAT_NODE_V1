const MD = require("../models/item_model")
const XlsxPopulate = require("xlsx-populate")
const upload =(file)=>{
    return new Promise(async(res, rej) => {
        try {
             await MD.FileUpload.create({filename:file})
            .then((data)=>{
                res({status:true})
            })
            .catch((err)=>{
                rej({status:false,mes:"DB ERR"})
            })
        } catch (error) {
            rej({status:false, mes:"err"})
        }
    })
}


const read=(name)=>{
    return new Promise(async(res, rej) => {
        try {
            await MD.FileUpload.findOne({filename:name})
            .then(async(data)=>{
                if(data){
                   const result = await readAllDataFromFile(name)
                    res({status:true, result})
                }else{
                    res({status:false, mes:"ERR"})
                }
            })
            .catch((err)=>{
                rej({status:false, mes:err})
            })
        } catch (error) {
            rej({status:false, mes:error})
        }
    })
}

const readAndReplace=(name,filter,replace)=>{
    return new Promise(async(res, rej) => {
        try {
            await MD.FileUpload.findOne({filename:name})
            .then(async(data)=>{
                if(data){
                   const result = await findAndReplace(name,filter,replace)
                    res({status:true, result})
                }else{
                    res({status:false, mes:"ERR"})
                }
            })
            .catch((err)=>{
                rej({status:false, mes:err})
            })
        } catch (error) {
            rej({status:false, mes:error})
        }
    })
}

const readAllDataFromFile =(name)=>{
    return new Promise((resolve, reject) => {
         try {
          XlsxPopulate.fromFileAsync("./uploads/"+name)
          .then((workbook)=>{
            const values = workbook.sheet(0).usedRange().value()
            resolve(values)
          })
          .catch((err)=>{
            resolve({message: "Not valid"})
          })
         } catch (error) {
            reject([])
         }
         return XlsxPopulate.toFileAsync("./uploads/"+name)
    })
}

const  findAndReplace=(name,filter,replace)=>{
    XlsxPopulate.fromFileAsync("./uploads/"+name)
    .then ((workbook)=>{
      workbook.find(filter,replace)
      return workbook.toFileAsync("merge-"+name);
    })
  }

const findAndReplace2=(name)=>{
    XlsxPopulate.fromFileAsync("./uploads/"+name)
    .then ((workbook)=>{
      workbook.find("Loc","Huu")
      console.log("Successful")
      return workbook.toFileAsync("./new_"+name);
    })
  }

module.exports = {
    upload,
    read,
    findAndReplace2
}