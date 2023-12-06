const router = require("express").Router();
const numberprocess = require("./numberprocess");

router.get("/", async (req, res) => {
  const number = await numberprocess.getAll();
  res.status(200).json(number);
});

router.put("/custom", async (req, res) => {
  const number = await numberprocess.custom(
    req.body.width,
    req.body.height,
    req.body.unit
  );
  res.status(200).json(number);
});

router.put("/border", async (req, res) => {
  const number = await numberprocess.border(
    req.body.border,
    req.body.borderradius,
    req.body.bordercolor
  );
  res.status(200).json(number);
});

router.put("/text", async (req, res) => {
  const number = await numberprocess.text(
    req.body.fontsize,
    req.body.bgcolor,
    req.body.textcolor
  );
  res.status(200).json(number);
});

router.put("/posi", async (req, res) => {
  const number = await numberprocess.posi(req.body.posi);
  res.status(200).json(number);
});

router.put("/type", async (req, res) => {
  const number = await numberprocess.type(req.body.type);
  res.status(200).json(number);
});

module.exports = router;
