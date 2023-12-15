const router = require("express").Router();
const numberhprocess = require("./numberhprocess");

router.get("/", async (req, res) => {
  const numberh = await numberhprocess.getAll();
  res.status(200).json(numberh);
});

router.post("/add", async (req, res) => {
  const numberh = await numberhprocess.add(req.body.data, req.body.row);
  res.status(200).json(numberh);
});

router.put("/delete", async (req, res) => {
  const numberh = await numberhprocess.deleteRow(req.body.data);
  res.status(200).json(numberh);
});

router.put("/update", async (req, res) => {
  const numberh = await numberhprocess.update(req.body.data);
  res.status(200).json(numberh);
});

module.exports = router;
