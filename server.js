const express = require("express"); //khởi tạo server
const cors = require("cors"); //Phân quyền truy cập
const auth = require("./route/auth");
const device = require("./route/device");
const gauge = require("./route/gauge");
const bardata = require("./route/bardata");
const switchtoggle = require("./route/switchtoggle");
const barchart = require("./route/barchart");
const slider = require("./route/slider");
const tablepro = require("./route/tablepro");
const image = require("./route/image");
const number = require("./route/number");
const lamp = require("./route/lamp");
const app = express();
const server = require("http").createServer(app); //Khai báo server
server.listen(process.env.PORT || 3000); // Khởi chạy server
app.use(express.json({ limit: "50mb" }));
//app.use(express.json()); // Cấu hình express kiểu JSON
app.use(
  express.urlencoded({ extended: true, limit: "50mb", parameterLimit: 50000 })
); // Cấu hình express urlencoded
app.use(
  cors({
    credentials: true,

    origin: [
      "http://172.16.0.204",
      "http://172.16.0.169:81",
      "http://172.16.0.144:81",
      "http://172.16.0.66",
      "http://172.16.0.169",
      "http://iot-dev.datgroup.com.vn:3700",
      "http://192.168.1.23",
      "http://172.16.0.40",
    ],
  })
);
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use("/", auth);
app.use("/device", device);
app.use("/gauge", gauge);
app.use("/bardata", bardata);
app.use("/tablepro", tablepro);
app.use("/switchtoggle", switchtoggle);
app.use("/barchart", barchart);
app.use("/slider", slider);
app.use("/image", image);
app.use("/number", number);
app.use("/lamp", lamp);
