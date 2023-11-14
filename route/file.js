const router = require("express").Router()
const fileprocess = require("./fileprocess")
const multer = require("multer")

const fs = require('fs'); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

router.post("/upload",upload.single("file"),async(req,res)=>{
    
    const fileName = await fileprocess.upload(req.file.filename)
    await fileprocess.findAndReplace2(req.file.filename)
    res.status(200).json({message:"ok"})
    
})


router.get("/file",async(req,res)=>{

  const path = 'C:/HSU/TTTN/DAT/MongoDB/TestD1/uploads/out.xlsx';  
  const filePath = fs.createWriteStream(path); 
  res.pipe(filePath); 
  filePath.on('finish',() => { 
      filePath.close(); 
      console.log('Download Completed');  
  }) 

})

router.post("/read",async(req,res)=>{
    const file = await fileprocess.read(req.body.name)
    res.status(200).json({file})
})

module.exports = router