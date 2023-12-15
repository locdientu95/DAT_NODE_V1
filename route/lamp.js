const router = require("express").Router();
const lampprocess = require("./lampprocess");

router.get("/", async (req, res) => {
  const lamp = await lampprocess.getAll();
  res.status(200).json(lamp);
});

router.put("/custom", async (req, res) => {
  const lamp = await lampprocess.custom(
    req.body.width,
    req.body.height,
    req.body.fontsize
  );
  res.status(200).json(lamp);
});

router.put("/update", async (req, res) => {
  const lamp = await lampprocess.update(
    req.body.value,
    req.body.text,
    req.body.color,
    req.body.bgcolor
  );
  res.status(200).json(lamp);
});

router.put("/border", async (req, res) => {
  const lamp = await lampprocess.border(
    req.body.border,
    req.body.borderradius,
    req.body.bordercolor
  );
  res.status(200).json(lamp);
});

router.put("/posi", async (req, res) => {
  const lamp = await lampprocess.posi(req.body.posi);
  res.status(200).json(lamp);
});

router.get("/delete", async (req, res) => {
  const lamp = await lampprocess.deletee(req.body.index);
  res.status(200).json(lamp);
});

module.exports = router;
