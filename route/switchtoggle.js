const router = require("express").Router();
const switchtoggleprocess = require("./switchtoggleprocess");

router.get("/", async (req, res) => {
    const data = await switchtoggleprocess.switchtoggle();
    res.status(200).json(data);
})

module.exports = router