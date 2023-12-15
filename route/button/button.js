const router = require("express").Router();
const { Button } = require("../../models/item_model");
const buttonprocess = require("./buttonprocesss");

router.get("/", async (req, res) => {
  const button = await buttonprocess.getAll();
  res.status(200).json(button);
});

router.put("/line1", async (req, res) => {
  const button = await buttonprocess.line1(
    req.body.width,
    req.body.height,
    req.body.borderradius
  );
  res.status(200).json(button);
});

router.put("/line2", async (req, res) => {
  const button = await buttonprocess.line2(
    req.body.backgroundon,
    req.body.texton,
    req.body.fontsizeon,
    req.body.textcoloron
  );
  res.status(200).json(button);
});

router.put("/line3", async (req, res) => {
  const button = await buttonprocess.line3(
    req.body.backgroundoff,
    req.body.textoff,
    req.body.fontsizeoff,
    req.body.textcoloroff
  );
  res.status(200).json(button);
});

router.put("/line4", async (req, res) => {
  const button = await buttonprocess.line4(req.body.type);
  res.status(200).json(button);
});
module.exports = router;
