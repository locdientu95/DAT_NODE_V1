const router = require("express").Router();
const projectdataprocess = require("./projectdataprocess");

router.post("/", async (req, res) => {
  const projectdata = await projectdataprocess.getAll(
    req.body.bu,
    req.body.user
  );
  res.status(200).json(projectdata);
});

module.exports = router;
