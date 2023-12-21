const router = require("express").Router();
const numbervprocess = require("./numbervprocess");

router.get("/", async (req, res) => {
  const numberv = await numbervprocess.getAll();
  res.status(200).json(numberv);
});

router.put("/add", async (req, res) => {
  const numberv = await numbervprocess.add(
    req.body.header,
    req.body.data,
    req.body.col
  );
  res.status(200).json(numberv);
});

router.put("/delete", async (req, res) => {
  const numberv = await numbervprocess.deleteCol(
    req.body.header,
    req.body.data
  );
  res.status(200).json(numberv);
});

router.put("/updateTit", async (req, res) => {
  const numberv = await numbervprocess.updateTit(req.body.header);
  res.status(200).json(numberv);
});

router.put("/updateData", async (req, res) => {
  const numberv = await numbervprocess.updateData(req.body.data);
  res.status(200).json(numberv);
});

module.exports = router;
