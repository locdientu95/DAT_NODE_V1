const router = require("express").Router();
const projectdataprocess = require("./projectdataprocess");

router.post("/", async (req, res) => {
  const projectdata = await projectdataprocess.getAll(
    req.body.bu,
    req.body.user
  );
  res.status(200).json(projectdata);
});

router.post("/add", async (req, res) => {
  const projectdata = await projectdataprocess.add(
    req.body.projectid,
    req.body.name,
    req.body.company,
    req.body.info,
    req.body.statement,
    req.body.custom,
    req.body.long,
    req.body.lat,
    req.body.bu,
    req.body.user
  );
  res.status(200).json(projectdata);
});

module.exports = router;
