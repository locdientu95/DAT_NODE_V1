const router = require("express").Router();
const imageprocess = require('./imageprocess')

router.post("/uploads",async(req,res)=>{
    const upload = await imageprocess.upload(req.body.base64)
    res.status(200).json("Success")
})


router.get("/getimg",async(req,res)=>{
    const img = await imageprocess.getImage()
    res.status(200).json(img)
})
module.exports = router