const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require('gridfs-stream');
const MD = require("../models/item_model");
const mongoose = require('mongoose')


let gfs
let conn = MD.con
conn.once('open',()=>{
    gfs = Grid(conn.db,mongoose.mongo)
})

const storage = new GridFsStorage({
    url: mongoURI,
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