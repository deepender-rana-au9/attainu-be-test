const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const requireLogin = require("../middlewares/requireLogin");
const imageFunc = require("../middlewares/imageDownload");
const jsonpatch = require("json-patch");

router.post("/jsonpatch", requireLogin, (req, res) => {
  jsonpatch.apply(req.body.jsonObject, req.body.jsonPatch);
  res.json({
    Patched: req.body.jsonObject,
  });
});

router.post("/image", requireLogin, imageFunc, (req, res) => {});

router.put("/addaddress", requireLogin, (req, res) => {
  const { streetAddress, route, city, state, zip, country } = req.body;
  if (!streetAddress || !route || !city || !state || !zip || !country) {
    return res.status(422).json({ err: "All the fields are compulsory" });
  } else {
    User.findByIdAndUpdate(
      req.user._id,
      {
        address: req.body,
      },
      {
        new: true,
      }
    ).exec((err, result) => {
      if (err) {
        return res.status(422).json({ err });
      } else {
        res.json(result);
      }
    });
  }
});

module.exports = router;
