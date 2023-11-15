const router = require("express").Router();
const barchart = require("./barchartprocess");

router.get("/", async (req, res) => {
    const data = await barchartprocess.barchart();
    res.status(200).json(data);
})

module.exports = router