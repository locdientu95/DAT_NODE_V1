const router = require("express").Router();
const authprocess = require("./authprocess");
const verifyToken = require("./verify");

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

router.post("/uploads", async (req, res) => {
  const upload = await authprocess.upload(req.body.base64);
  res.status(200).json("Success");
});

router.post("/Login", async (req, res) => {
  const user = await authprocess.Login(req.body.username, req.body.password);
  res.status(200).json(user);
});

router.post("/UpdateImage", async (req, res) => {
  const user = await authprocess.UpdateImage(
    req.body.username,
    req.body.base64
  );
  res.status(200).json(user);
});

router.post("/getimg", async (req, res) => {
  const img = await authprocess.getImage(req.body.username);
  res.status(200).json(img);
});

router.delete("/delete", async (req, res) => {
  const user = await authprocess.deleteUser(req.body.username);
  res.status(200).json(user);
});

router.put("/changePassword", async(req,res)=>{
  const user = await authprocess.changePassword(req.body.username,req.body.password)
  res.status(200).json(user)
})
module.exports = router;
