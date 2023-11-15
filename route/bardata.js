const router = require("express").Router();
const bardataprocess = require("./bardataprocess");

router.get("/", async (req, res) => {
    const data = await bardataprocess.bardata();
    res.status(200).json(data);
})

module.exports = router