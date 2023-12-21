const router = require("express").Router();
const errsettingprocess = require("./errsettingprocess")

router.get("/",async(req,res)=>{
    const err = await errsettingprocess.getData()
    res.status(200).json(err)
})

router.post("/saveInfo",async(req,res)=>{
    const err = await errsettingprocess.saveInfo(req.body._id,req.body.infodata)
    res.status(200).json(err)
})

router.post("/addInfo",async(req,res)=>{
    const err = await errsettingprocess.addInfo(req.body._id,req.body.infodata,req.body.infoDataRow)
    res.status(200).json(err)
})

router.post("/deleteInfo",async(req,res)=>{
    const err = await errsettingprocess.deleteInfo(req.body._id,req.body.infodata)
    res.status(200).json(err)
})

router.post("/addAddress",async(req,res)=>{
    const err = await errsettingprocess.addAddress(req.body._id,req.body.adddata,req.body.addDataRow)
    res.status(200).json(err)
})

router.post("/saveAddress",async(req,res)=>{
    const err = await errsettingprocess.saveAddress(req.body._id,req.body.adddata)
    res.status(200).json(err)
})

router.post("/deleteAddress",async(req,res)=>{
    const err = await errsettingprocess.deleteAddress(req.body._id,req.body.adddata)
    res.status(200).json(err)
})

module.exports = router