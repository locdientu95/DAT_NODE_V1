const router = require("express").Router();
const barprocess = require("./barprocess");


router.get("/", async (req, res) => {
  const bar = await barprocess.getAll();
  res.status(200).json(bar);
});

router.put("/update", async (req, res) => {
  const bar = await barprocess.update(
    req.body.min,
    req.body.max,
    req.body.color,
    req.body.scale,
    req.body.realdata,
    req.body.type,
    req.body.w,
    req.body.h,
    req.body.bgcolor,
    req.body.realdatacolor
  );
  res.status(200).json(bar);
});

router.put("/line1", async (req, res) => {
  const bar = await barprocess.line1(
    req.body.wi,
    req.body.he
  );
  res.status(200).json(bar);
})

router.put("/min", async (req, res) => {
  const bar = await barprocess.min(
    req.body.min
  );
  res.status(200).json(bar);
})


module.exports = router;
