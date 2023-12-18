const router = require("express").Router();
const view16bitprocess = require("./view16bitprocess");

router.get("/", async (req, res) => {
    const view16bit = await view16bitprocess.getAll();
    res.status(200).json(view16bit);
  });
  
  router.put("/pushAllData", async (req, res) => {
      const view16bit = await view16bitprocess.pushAllData(
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
        req.body.val
      );
      res.status(200).json(view16bit);
  })

module.exports = router;