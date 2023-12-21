const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const devicedataSchema = new mongoose.Schema([
  {
    name: String,
    description: String,
    custom: String,
    statement: Number,
    gateway: String,
    bu: String,
    user: String,
  },
]);

const projectdataSchema = new mongoose.Schema([
  {
    projectid: String,
    name: String,
    company: String,
    info: String,
    statement: Number,
    custom: String,
    long: String,
    lat: String,
    bu: String,
    user: String,
  },
]);

const registerSchema = new mongoose.Schema({
  username: {
    type: String,
    require: (true, " Please insert a name"),
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: "user",
  },
  avatar: {
    type: String,
  },
});

const deviceSchema = new mongoose.Schema(
  {
    deviceid: {
      type: String,
      require: (true, " Please insert a name"),
    },
    name: {
      type: String,
      require: true,
      default: 1,
    },
    des: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const gaugeSchema = new mongoose.Schema({
  label: String,
  labelsize: String,
  labelcolor: String,
  unit: String,
  valuesize: String,
  valuecolor: String,
  min: Number,
  max: Number,
  width: String,
  height: String,
  segment: Number,
  needlecolor: String,
  startcolor: String,
  endcolor: String,
  cal: String,
});

const sliderSchema = new mongoose.Schema({
  min: Number,
  max: Number,
  width: String,
  height: String,
  scale: Number,
  ori: String,
  thumb: { bgcolor: String, border: String },
  track: { bgcolor: String, border: String },
  rail: { bgcolor: String },
});

const lampSchema = new mongoose.Schema({
  value: String,
  data: {
    index: Number,
    index: {
      text: String,
      color: String,
      bgcolor: String,
    },
  },
  width: String,
  height: String,
  fontsize: String,
  border: String,
  borderradius: String,
  bordercolor: String,
  posi: String,
});

const numberSchema = new mongoose.Schema({
  width: String,
  height: String,
  unit: String,
  border: String,
  bordercolor: String,
  borderradius: String,
  bgcolor: String,
  textcolor: String,
  fontsize: String,
  type: String,
  posi: String,
});

const numberhSchema = new mongoose.Schema({
  row: Number,
  data: [
    {
      id: Number,
      label: String,
      value: String,
      unit: String,
    },
  ],
});

const dashboardbarchartSchema = new mongoose.Schema({
  xlabel: String,
  ylabel: String,
  labels: [String],
  datasets: [
    {
      label: String,
      data: [Number],
    },
  ],
});

const numbervSchema = new mongoose.Schema({
  row: Number,
  col: Number,
  header: { type: Array },
  // [
  //   {
  //     name: String,
  //     code: String,
  //   },
  // ],
  data: { type: Array },
  // [
  //   {
  //     id: Number,
  //     label: String,
  //     label_1: String,
  //   },
  // ],
});

const tablepro = new mongoose.Schema({
  width: String,
  data: {
    type: Array,
  },
  head: {
    type: Array,
  },
  row: Number,
  col: Number,
});

const buttonSchema = new mongoose.Schema({
  btntype: String,
  coloron: String,
  coloroff: String,
  bgon: String,
  bgoff: String,
  texton: String,
  textoff: String,
  cal: String,
  w: String,
  h: String,
  sizeon: String,
  sizeoff: String,
  txtcoloron: String,
  txtcoloroff: String,
  type: String,
  radius: String,
});

const barSchema = new mongoose.Schema({
  id: Number,
  min: String,
  max: String,
  color: String,
  scale: Number,
  realdata: Number,
  type: String,
  w: String,
  h: String,
  bgcolor: String,
  realdatacolor: String,
});

const switchSchema = new mongoose.Schema({
  texton: String,
  textoff: String,
  bgon: String,
  bgoff: String,
  txtcoloron: String,
  txtcoloroff: String,
  textsize: Number,
  w: String,
  h: String,
  border: String,
  borderradius: String,
  bordercolor: String,
  borderradiusicon: String,
});

const view32bitSchema = new mongoose.Schema({
  fontSize: String,
  color: String,
  alignItems: String,
  justifyContent: String,
  width: String,
  height: String,
  borderRadius: String,
  backgroundColor: String,
  borderColor: String,
  display: String,
  val1: Number,
  val2: Number,
});

const view16bitSchema = new mongoose.Schema({
  fontSize: String,
  color: String,
  alignItems: String,
  justifyContent: String,
  width: String,
  height: String,
  borderRadius: String,
  backgroundColor: String,
  borderColor: String,
  display: String,
  val: Number,
});

registerSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    console.log(hashPassword);
    next();
  } catch (error) {
    console.log(error);
  }
});

registerSchema.methods.isCheckPassword = async function (password, next) {
  try {
    return await bcrypt.compare(password, this.password);
    wertwer;
  } catch (error) {
    next(error);
  }
};

const imageupload = new mongoose.Schema({
  image: String,
});

const Devicedata = mongoose.model("Devicedata", devicedataSchema);
const Projectdata = mongoose.model("Projectdata", projectdataSchema);
const View16bit = mongoose.model("View16bit", view16bitSchema);
const View32bit = mongoose.model("View32bit", view32bitSchema);
const Switch = mongoose.model("Switch", switchSchema);
const Bar = mongoose.model("Bar", barSchema);
const Button = mongoose.model("Button", buttonSchema);
const historySchema = new mongoose.Schema({
  id: String,
  code: String,
  data: [
    {
      time: String,
      val_1: String,
      val_2: String,
      val_3: String,
    },
  ],
  date: String,
});

const errsettingSchema = new mongoose.Schema({
  adddata: [
    {
      id: String,
      addressCode: String,
      addressState: String,
      value: String,
    },
  ],
  infodata: [
    {
      id: String,
      ErrCode: String,
      ErrName: String,
      ErrType: String,
      info: String,
      solution: String,
    },
  ],
  addDataRow: Number,
  infoDataRow: Number,
});

const errorlogsSchema = new mongoose.Schema({
  id: Number,
  DeviceID: String,
  ErrCode: String,
  DeviceType: String,
  ErrStt: String,
  ErrType: String,
  ProjectName: String,
  Datetime: String,
  read: {
    type: Boolean,
    default: true,
  },
});

const ErrorLogs = mongoose.model("Errorlogs", errorlogsSchema);
const ErrSetting = mongoose.model("ErrSetting", errsettingSchema);
const History = mongoose.model("History", historySchema);
const Register = mongoose.model("Register", registerSchema);
const Device = mongoose.model("Device", deviceSchema);
const NumberV = mongoose.model("NumberV", numbervSchema);
const Dashboardbarchart = mongoose.model(
  "Dashboardbarchart",
  dashboardbarchartSchema
);
const NumberH = mongoose.model("NumberH", numberhSchema);
const Num = mongoose.model("Number", numberSchema);
const Lamp = mongoose.model("Lamp", lampSchema);
const Slider = mongoose.model("Slider", sliderSchema);
const Gauge = mongoose.model("Gauge", gaugeSchema);
const Tablepro = mongoose.model("Tablepro", tablepro);
const ImageUpload = mongoose.model("ImageUpload", imageupload);
// const mongoURI = 'mongodb://loctp:abc123@164.70.98.231:27017/admin';
mongoose.connect("mongodb://loctp:abc123@164.70.98.231:27017/admin");
// const conn = mongoose.createConnection(mongoURI)

// let gfs;
// conn.once('open', () => {
//     // Init stream
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection('uploads');
// });

module.exports = {
  Register,
  Device,
  Gauge,
  Lamp,
  Dashboardbarchart,
  NumberV,
  NumberH,
  Slider,
  Num,
  ImageUpload,
  Tablepro,
  Button,
  Bar,
  Switch,
  View32bit,
  View16bit,
  History,
  Projectdata,
  Devicedata,
  ErrSetting,
  ErrorLogs,
};
