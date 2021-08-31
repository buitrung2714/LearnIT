const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// @route POST api/auth/register
// @desc Register User
// @access Public
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  //Simple Validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "UserName and Password not empty" });
  }

  try {
    //Check for existing User
    const user = await User.findOne({ username });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Username already exist" });

    //All good
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    //return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    return res.json({
      success: true,
      message: "Register User Successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// @route POST api/auth/login
// @desc Register User
// @access Public
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  //Simple Validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Please fill full infomation" });

  try {
    //Checking for existing User
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Username or Password incorrect" });

    //Found User
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Username or Password incorrect" });

    //All good
    const accessToken = jwt.sign(
      { userID: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    return res.json({
      success: true,
      message: "Login successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
