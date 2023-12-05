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
    avatar: {
      type: String,
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
    type: Object,
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

const tablepro = new mongoose.Schema({
  width: String,
  data: { id: Number, val_1: String },
  head: { name: String, code: String },
  row: Number,
  col: Number,
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
  Numbers,
  ImageUpload,
  Tablepro,
};
