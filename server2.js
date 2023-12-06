const express = require("express"); //khởi tạo server
const cors = require("cors"); //Phân quyền truy cập
const app = express();
const server = require("http").createServer(app); //Khai báo server
server.listen(process.env.PORT || 3000); // Khởi chạy server
app.use(express.json()); // Cấu hình express kiểu JSON
app.use(express.urlencoded({ extended: true })); // Cấu hình express urlencoded
app.use(
  cors({
    credentials: true,

    origin: [
      "http://172.16.0.204",
      "http://172.16.0.169:81",
      "http://172.16.0.144:81",
    ],
  })
);
const multer = require('multer')
const {GridFsStorage} = require('multer-gridfs-storage')
const methodOverride = require('method-override')
const path= require('path')
const crypto = require('crypto')
const mongoose = require('mongoose')
const Grid = require('gridfs-stream')
const { GridFSBucket } = require('mongodb');



//Middleware
app.use(methodOverride("_method"));

//Mongo
const mongoURI = "mongodb://loctp:abc123@164.70.98.231:27017/admin";

//Create mongo connection
const conn = mongoose.createConnection(mongoURI);

//Init
let gfs;
conn.once("open", () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

// @route POST /upload
// @desc  Uploads file to DB
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ file: req.file });
  console.log(req.file);
  res.redirect("/");
});

app.get("/files", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "No files exist",
      });
    }

    // Files exist
    return res.json(files);
  });
});


  app.get('/files', async (req, res) => {
    try {
      const files = await gfs.files.find({}).toArray();
      // Check if files
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: 'No files exist'
        });
      }
      // Files exist
      return res.json(files);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        err: 'Internal Server Error'
      });
    }
  });



  // app.get('/files/:filename', async(req, res) => {
  //   const files = await gfs.files.findOne({ filename: req.params.filename })
  //     // Check if file
  //     if (!files || files.length === 0) {
  //       return res.status(404).json({
  //         err: 'No file exists'
  //       });
  //     }
  //     // File exists
  //     return res.json(files);
    
  // });



// Code chạy dc




// const { ObjectId } = mongoose.Types;

// app.get('/files/:filename', async (req, res) => {
//   try {
//     const file = await gfs.files.findOne({ filename: req.params.filename });
//     if (!file || file.length === 0) {
//       return res.status(404).json({
//         err: 'No file exists',
//       });
//     }

//     const bucket = new mongoose.mongo.GridFSBucket(conn.db);
//     const downloadStream = bucket.openDownloadStream(file._id);

//     downloadStream.on('error', (error) => {
//       console.error('Error downloading file:', error.message);
//       res.status(500).json({
//         err: 'Hello',
//       });
//     });

//     downloadStream.pipe(res);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       err: 'Internal Server Error',
//     });
//   }
// });

app.get('/files/:filename', async (req, res) => {
  try {
    const file = await MD.gfs.files.findOne({ filename: req.params.filename });
    if (!file) {
      return res.status(404).json({
        err: 'No file exists',
      });
    }

    const fileId = file._id; // Không cần phải chuyển thành ObjectId
    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
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


const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
