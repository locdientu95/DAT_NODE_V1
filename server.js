const express = require("express"); //khởi tạo server
const cors = require("cors"); //Phân quyền truy cập
const auth = require("./route/auth");
const device = require("./route/device");
const gauge = require("./route/gauge");
const slider = require("./route/slider");
const tablepro = require("./route/tablepro");
const image = require("./route/image");
const number = require("./route/number");
const lamp = require("./route/lamp");
const button = require("./route/button/button");
const bar = require("./route/bar/bar");
const switchtoggle = require("./route/switch/switch");
const view32bit = require("./route/view32bit/view32bit");
const view16bit = require("./route/view16bit/view16bit");
const numberh = require("./route/numberh");
const numberv = require("./route/numberv");
const history = require("./route/history");
const projectdata = require("./route/projectdata/projectdata");
const devicedata = require("./route/projectdata/devicedata");
const errsetting = require("./route/errsetting")
const errorlog = require("./route/errorlog")
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
      "http://172.16.0.83:81",
      "http://172.16.0.144:81",
      "http://172.16.0.66",
      "http://172.16.0.162",
      "http://172.16.0.162:81",
      "http://iot-dev.datgroup.com.vn:3700",
      "http://192.168.1.23",
      "http://172.16.0.160:81",
      "http://172.16.0.133:81",
      "http://172.16.0.106",
      "http://172.16.0.169:81",
    ],
  })
);
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use("/", auth);
app.use("/device", device);
app.use("/gauge", gauge);
app.use("/tablepro", tablepro);
app.use("/slider", slider);
app.use("/image", image);
app.use("/number", number);
app.use("/lamp", lamp);
app.use("/button", button);
app.use("/bar", bar);
app.use("/switch", switchtoggle);
app.use("/view32bit", view32bit);
app.use("/view16bit", view16bit);
app.use("/numberh", numberh);
app.use("/numberv", numberv);
app.use("/history", history);
app.use("/projectdata", projectdata);
app.use("/devicedata", devicedata);
app.use("/errsetting",errsetting);
app.use("/errorlog",errorlog)
