const router = require("express").Router();
const errorlogprocess = require("./errorlogprocess")

router.get("/",async(req,res)=>{
    const err = await errorlogprocess.getData()
    res.status(200).json(err)
})

router.post("/deleteData",async(req,res)=>{
    const err = await errorlogprocess.deleteData(req.body.id)
    res.status(200).json(err)
})
module.exports = router