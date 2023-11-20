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
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const methodOverride = require("method-override");
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

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

app.get("/files/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }
    // File exists
    return res.json(file);
  });
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
