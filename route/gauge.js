const router = require("express").Router();
const gaugeprocess = require("./gaugeprocess");

router.get("/", async (req, res) => {
  const gauge = await gaugeprocess.getAll();
  res.status(200).json(gauge);
});

router.put("/custom", async (req, res) => {
  const gauge = await gaugeprocess.custom(
    req.body.width,
    req.body.height,
    req.body.segment
  );
  res.status(200).json(gauge);
});

router.put("/tit", async (req, res) => {
  const gauge = await gaugeprocess.tit(
    req.body.label,
    req.body.labelsize,
    req.body.labelcolor
  );
  res.status(200).json(gauge);
});

router.put("/unit", async (req, res) => {
  const gauge = await gaugeprocess.unit(
    req.body.unit,
    req.body.valuesize,
    req.body.valuecolor
  );
  res.status(200).json(gauge);
});

router.put("/min", async (req, res) => {
  const gauge = await gaugeprocess.min(req.body.min);
  res.status(200).json(gauge);
});

router.put("/max", async (req, res) => {
  const gauge = await gaugeprocess.max(req.body.max);
  res.status(200).json(gauge);
});

router.put("/color", async (req, res) => {
  const gauge = await gaugeprocess.color(
    req.body.needlecolor,
    req.body.startcolor,
    req.body.endcolor
  );
  res.status(200).json(gauge);
});

module.exports = router;
