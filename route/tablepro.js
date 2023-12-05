const router = require('express').Router()
const tablepro = require('./tableproprocess')

router.get("/",async(req,res)=>{
    let data = await tablepro.getAll()
    res.status(200).json(data)
})

router.post("/addrow",async(req,res)=>{
    let data = await tablepro.addRow(req.body.id,req.body.data,req.body.row)
    res.status(200).json(data)
})

router.post("/deleterow",async(req,res)=>{
    let data = await tablepro.deleteRow(req.body.id,req.body.data)
    res.status(200).json(data)
})

router.put("/addcol",async(req,res)=>{
    let data = await tablepro.addCol(req.body.id,req.body.data,req.body.head,req.body.col)
    res.status(200).json(data)
})

router.post("/deletecol",async(req,res)=>{
    let data = await tablepro.deleteCol(req.body.id,req.body.data,req.body.head)
    res.status(200).json(data)
})

router.post("/changehead",async(req,res)=>{
    let data = await tablepro.changeHead(req.body.id,req.body.head)
    res.status(200).json(data)
})

router.post("/changevalue",async(req,res)=>{
    let data = await tablepro.changeValue(req.body.id,req.body.data)
    res.status(200).json(data)
})

module.exports = router