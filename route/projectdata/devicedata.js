const router = require("express").Router();
const devicedataprocess = require("./devicedataprocess");

router.post("/", async (req, res) => {
  const devicedata = await devicedataprocess.getAll(req.body.bu, req.body.user);
  res.status(200).json(devicedata);
});

router.post("/add", async (req, res) => {
  const devicedata = await devicedataprocess.add(
    req.body.name,
    req.body.description,
    req.body.custom,
    req.body.statement,
    req.body.gateway,
    req.body.bu,
    req.body.user
  );
  res.status(200).json(devicedata);
});

module.exports = router;
