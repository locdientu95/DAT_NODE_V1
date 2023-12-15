const router = require("express").Router();
const switchprocess = require("./switchproccess");

router.get("/", async (req, res) => {
  const switchtoggle = await switchprocess.getAll();
  res.status(200).json(switchtoggle);
});

router.put("/pushAllData", async (req, res) => {
    const switchtoggle = await switchprocess.pushAllData(
      req.body.texton,
      req.body.textoff,
      req.body.bgon,
      req.body.bgoff,
      req.body.txtcoloron,
      req.body.txtcoloroff,
      req.body.textsize,
      req.body.w,
      req.body.h,
      req.body.border,
      req.body.borderradius,
      req.body.bordercolor,
      req.body.borderradiusicon
    );
    res.status(200).json(switchtoggle);
})

module.exports = router;
