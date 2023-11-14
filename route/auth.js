const router = require("express").Router();
const authprocess = require("./authprocess");
const verifyToken = require("./verify");

// router.get("/dat?",async (req, res) => {
//     let tai = req.query['tai']
//     let phu = req.query['phu']
//     console.log(tai,phu)
//     const user = await authprocess.auth()
//     res.status(200).json(user)
// })

router.get("/", async (req, res) => {
  const user = await authprocess.auth();
  res.status(200).json(user);
});

router.post("/addUser", async (req, res) => {
  const user = await authprocess.addUser(
    req.body.username,
    req.body.password,
    req.body.email,
    req.body.name,
    req.body.role
  );
  res.status(200).json(user);
});

router.post("/Login", async (req, res) => {
  const user = await authprocess.Login(req.body.username, req.body.password);
  res.status(200).json(user);
});

module.exports = router;
