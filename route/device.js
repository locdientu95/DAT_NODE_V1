const router = require("express").Router()
const deviceprocess = require("./deviceprocess")

router.get("/", async (req, res) => {
    const device = await deviceprocess.getAll()
    res.status(200).json(device)
})

router.post("/addDevice", async (req, res) => {

    const device = await deviceprocess.addDevice(req.body.deviceid,req.body.name,req.body.des,req.body.status)
    res.status(200).json(device)
})

router.put("/update", async(req,res)=>{
    const data = JSON.parse(req.body.data)
    const update ={name:data.name,status:data.stt,des:data.des}
    const device = await deviceprocess.updateAtId(data.id,update)
    res.status(200).json(device)  
})

router.delete("/delete",async(req,res)=>{
    const device = await deviceprocess.deleteDevice(req.body.id)
    res.status(200).json(device)
})

// router.put("/rep",async(req,res)=>{
//     const device = await deviceprocess.replaceinData(req.body.id)
//     res.status(200).json(device)
// })




module.exports = router;