const router = require("express").Router()
const historyprocess = require("./historyprocess");
const Xlsx = require("xlsx-populate")

router.post("/add",async(req,res)=>{
    const newData = await historyprocess.add(
        req.body.id,
        req.body.code,
        req.body.data,
        req.body.date
    )
    res.status(200).json(newData)
})

router.post("/getbyID",async(req,res)=>{
    const data = await historyprocess.getData(
        req.body.id,
        req.body.code,
        req.body.date,
    
    )
    res.status(200).json(data)
})

router.get("/getAll",async(req,res)=>{
    const data = await historyprocess.getAllData()
    res.status(200).json(data)
})
module.exports=router