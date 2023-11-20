const router = require("express").Router();
const bardataprocess = require("./bardataprocess");

router.get("/", async (req, res) => {
    const data = await bardataprocess.bardata();
    res.status(200).json(data);
})

router.put("/saveChange1", async (req, res) => {
    const bardata = await bardataprocess.saveChange1(
        req.body.w,
    )
})

module.exports = router