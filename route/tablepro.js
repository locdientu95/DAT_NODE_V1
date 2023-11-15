const router = require('express').Router()
const tablepro = require('./tableproprocess')

router.get("/",async(req,res)=>{
    let data = await tablepro.getAll()
    res.status(200).json(data)
})

module.exports = router