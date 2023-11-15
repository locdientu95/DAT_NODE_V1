const express = require("express"); //khởi tạo server
const cors = require("cors"); //Phân quyền truy cập
const auth = require("./route/auth");
const device = require("./route/device");
const gauge = require("./route/gauge");
<<<<<<< HEAD
const tablepro = require("./route/tablepro");
=======
const bardata = require("./route/bardata");
const switchtoggle = require("./route/switchtoggle");
const barchart = require("./route/barchart");
const slider = require("./route/slider");
>>>>>>> 033aea4bf53866fc3b6bfb93819fd5dc6e82c925
const app = express();
const server = require("http").createServer(app); //Khai báo server
server.listen(process.env.PORT || 3000); // Khởi chạy server
app.use(express.json()); // Cấu hình express kiểu JSON
app.use(express.urlencoded({ extended: true })); // Cấu hình express urlencoded
app.use(
  cors({
    credentials: true,
<<<<<<< HEAD
    origin: ["http://172.16.0.169:81"],
=======
    origin: ["http://172.16.0.204","http://172.16.0.144"],
>>>>>>> 033aea4bf53866fc3b6bfb93819fd5dc6e82c925
  })
);

app.use("/", auth);
app.use("/device", device);
app.use("/gauge", gauge);
<<<<<<< HEAD
app.use("/tablepro",tablepro)
=======
app.use("/bardata", bardata);
app.use("/switchtoggle", switchtoggle);
app.use("/barchart", barchart);
app.use("/slider", slider);
>>>>>>> 033aea4bf53866fc3b6bfb93819fd5dc6e82c925
