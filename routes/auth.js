const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const requireLogin = require("../middlewares/requireLogin");
const validator = require("email-validator");

router.get("/protected", requireLogin, (req, res) => res.send("Hello User"));

router.post("/signup", (req, res) => {
  const { name, email, password, confirmPassword, profileImage } = req.body;
  if (!name || !email || !password || !confirmPassword) {
    return res.status(422).json({ err: "All the fields are compulsory" });
  } else if (validator.validate(email)) {
    if (password === confirmPassword) {
      bcrypt.hash(password, 12).then((hashedPassword) => {
        User.findOne({ email })
          .then((savedUser) => {
            if (savedUser) {
              return res.status(422).json({ err: "Email already Used" });
            }
            const user = new User({
              name,
              email,
              password: hashedPassword,
              profileImage,
            });
            user
              .save()
              .then((user) => res.json({ message: "saved successfully" }))
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      });
    } else {
      return res.status(422).json({ err: "Password mismatch" });
    }
  } else {
    return res.json({ err: "Email Badly formated" });
  }
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ err: "All fields are compulsory" });
  } else {
    User.findOne({ email }).then((userFounded) => {
      if (!userFounded) {
        return res
          .status(422)
          .json({ err: "Register first or enter correct credentials" });
      }
      bcrypt
        .compare(password, userFounded.password)
        .then((matched) => {
          if (matched) {
            // return res.json({ message: "Logged in" });
            const token = jwt.sign({ _id: userFounded._id }, JWT_SECRET);
            const { _id, name, email, address, profileImage } = userFounded;
            res.json({
              token,
              user: { _id, name, email, address, profileImage },
            });
          } else {
            return res.json({ err: "Invalid email or password" });
          }
        })
        .catch((err) => console.log(err));
    });
  }
});

module.exports = router;
