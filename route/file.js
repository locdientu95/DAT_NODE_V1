const router = require("express").Router()
const multer = require('multer')
const crypto = require('crypto')
const { GridFsStorage } = require('multer-gridfs-storage')
const MD = require("../models/item_model")
const path = require('path')
const fileprocess = require("./fileprocess")





const storage = new GridFsStorage({
  url: MD.mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });
const test = multer.memoryStorage({storage})


router.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
  
});


router.get('/files/:filename', async (req, res) => {
  try {
    const file = await MD.gfs.files.findOne({ filename: req.params.filename });
    if (!file) {
      return res.status(404).json({
        err: 'No file exists',
      });
    }

    const fileId = file._id; // Không cần phải chuyển thành ObjectId
    const bucket = new mongoose.mongo.GridFSBucket(MD.conn.db, {
      bucketName: 'uploads', // Đảm bảo rằng đây là tên bucket đúng
    });
    const downloadStream = bucket.openDownloadStream(fileId);

    downloadStream.on('error', (error) => {
      console.error('Error downloading file:', error.message);
      res.status(500).json({
        err: 'Internal Server Error',
      });
    });

    downloadStream.pipe(res);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      err: 'Internal Server Error',
    });
  }
});



module.exports = router