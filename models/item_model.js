const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const registerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      require: (true, " Please insert a name"),
    },
    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
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
  },
  {
    timestamps: true,
  }
);

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
  value: Number,
  data: {
    0: { text: String, color: String, bgcolor: String },
    1: { text: String, color: String, bgcolor: String },
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
  header: [
    {
      name: String,
      code: String,
    },
  ],
  data: [
    {
      id: Number,
      label: String,
      label_1: String,
    },
  ],
});

const bardataSchema = new mongoose.Schema({
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

const switchtoggleSchema = new mongoose.Schema({
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

const barchartSchema = new mongoose.Schema({
  dataset: [
    {
      value1: Number,
      value2: Number,
      xAxis: String,
    },
    {
      value1: Number,
      value2: Number,
      xAxis: "seriesB",
    },
    {
      value1: Number,
      value2: Number,
      xAxis: "seriesC",
    },
    {
      value1: Number,
      value2: Number,
      xAxis: "seriesD",
    },
  ],
  w: "500",
  h: "300",
  labelsize: "10",
  tickNumb: 5,
  tickmaxstep: 5,
  tickminstep: 2,
  labelname: "Value",
  valuecolor: "#008000",
  series: "Series",
  valuetitle: "value1",
  chartnamefsize: "10px",
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

const Register = mongoose.model("Register", registerSchema);
const Device = mongoose.model("Device", deviceSchema);
const NumberV = mongoose.model("NumberV", numbervSchema);
const Dashboardbarchart = mongoose.model(
  "Dashboardbarchart",
  dashboardbarchartSchema
);
const NumberH = mongoose.model("NumberH", numberhSchema);
const Numbers = mongoose.model("Number", numberSchema);
const Lamp = mongoose.model("Lamp", lampSchema);
const Slider = mongoose.model("Slider", sliderSchema);
const Gauge = mongoose.model("Gauge", gaugeSchema);
//mongoose.connect('mongodb+srv://huuhuynh:huu123@cluster0.jkueaoi.mongodb.net/DAT_Database?retryWrites=true&w=majority')
mongoose
  .connect("mongodb://loctp:abc123@164.70.98.231:27017/admin")
  .then(() => {
    console.log("MD connected");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = {
  Register,
  Device,
  Gauge,
  Lamp,
  Dashboardbarchart,
  NumberV,
  NumberH,
  Slider,
  Numbers,
};
