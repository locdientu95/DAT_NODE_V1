const express = require("express") //khởi tạo server
const cors = require("cors") //Phân quyền truy cập
const auth = require("./route/auth")
const device = require("./route/device")
const file = require("./route/file")
const app = express()
const server = require("http").createServer(app) //Khai báo server
server.listen(process.env.PORT || 3000)  // Khởi chạy server
app.use(express.json()) // Cấu hình express kiểu JSON
app.use(express.urlencoded({extended:true})) // Cấu hình express urlencoded
app.use(cors({
    credentials:true,
    origin:['http://172.16.0.169:81']
}))



app.use("/",auth)   
app.use("/device",device)   
app.use("/file",file)

