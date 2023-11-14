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

module.exports = router;
