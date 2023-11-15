const router = require("express").Router();
const sliderprocess = require("./sliderprocess");

router.get("/", async (req, res) => {
  const slider = await sliderprocess.getAll();
  res.status(200).json(slider);
});

router.put("/custom", async (req, res) => {
  const slider = await sliderprocess.custom(
    req.body.width,
    req.body.height,
    req.body.scale
  );
  res.status(200).json(slider);
});

router.put("/min", async (req, res) => {
  const slider = await sliderprocess.min(req.body.min);
  res.status(200).json(slider);
});

router.put("/max", async (req, res) => {
  const slider = await sliderprocess.max(req.body.max);
  res.status(200).json(slider);
});

router.put("/ori", async (req, res) => {
  const slider = await sliderprocess.ori(req.body.ori);
  res.status(200).json(slider);
});

router.put("/color", async (req, res) => {
  const thumb = req.body.thumb;
  const thumbupdate = {
    bgcolor: thumb.bgcolor,
    border: thumb.border,
  };
  const track = req.body.track;
  const trackupdate = {
    bgcolor: track.bgcolor,
    border: track.border,
  };
  const rail = req.body.rail;
  const railupdate = { bgcolor: rail.bgcolor };

  const slider = await sliderprocess.color(
    thumbupdate,
    trackupdate,
    railupdate
  );
  res.status(200).json(slider);
});

module.exports = router;
