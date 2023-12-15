const router = require("express").Router();
const view32bitprocess = require("./view32bitprocess");

router.get("/", async (req, res) => {
  const view32bit = await view32bitprocess.getAll();
  res.status(200).json(view32bit);
});

router.put("/pushAllData", async (req, res) => {
    const view32bit = await view32bitprocess.pushAllData(
      req.body.fontSize,
      req.body.color,
      req.body.alignItems,
      req.body.justifyContent,
      req.body.width,
      req.body.height,
      req.body.borderRadius,
      req.body.backgroundColor,
      req.body.borderColor,
      req.body.display,
      req.body.val1,
      req.body.val2,
    );
    res.status(200).json(view32bit);
})

module.exports = router;
