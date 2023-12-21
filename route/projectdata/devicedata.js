const router = require("express").Router();
const devicedataprocess = require("./devicedataprocess");

router.post("/", async (req, res) => {
  const devicedata = await devicedataprocess.getAll(req.body.bu, req.body.user);
  res.status(200).json(devicedata);
});

module.exports = router;
