const router = require("express").Router();
const num = require("./numprocess");

router.get("/", async (req, res) => {
  const number = await num.getAll();
  res.status(200).json(number);
});

router.put("/custom", async (req, res) => {
  const number = await num.custom(
    req.body.width,
    req.body.height,
    req.body.unit
  );
  res.status(200).json(number);
});

router.put("/border", async (req, res) => {
  const number = await num.border(
    req.body.border,
    req.body.borderradius,
    req.body.bordercolor
  );
  res.status(200).json(number);
});

router.put("/text", async (req, res) => {
  const number = await num.text(
    req.body.fontsize,
    req.body.bgcolor,
    req.body.textcolor
  );
  res.status(200).json(number);
});

router.put("/posi", async (req, res) => {
  const number = await num.posi(req.body.posi);
  res.status(200).json(number);
});

router.put("/type", async (req, res) => {
  const number = await num.type(req.body.type);
  res.status(200).json(number);
});

module.exports = router;
