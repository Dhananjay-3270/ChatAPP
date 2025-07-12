// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bodyParser = require("body-parser");
const verifyAuth = require("../middleware/verifyAuth");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const secretkey = process.env.JWT_SECRET;

// This route listens to GET /users
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = password === existingUser.password;
    if (!isMatch) {
      res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ email, password }, secretkey);
    res.cookie("authcookie", token, {
      maxAge: 900000,
      httpOnly: true,
      sameSite: "lax", // or 'none' if using HTTPS
      // secure: true, // uncomment if using HTTPS
    });
    return res
      .status(200)
      .json({ message: "Login successful", user: existingUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/register", async (req, res) => {
  const { fullName, userName, email, password, ConfirmPassword, age } =
    req.body;
  try {
    const existingUser = await User.find({ $or: [{ userName }, { email }] });
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ error: "Username or Email already exists." });
    }
    const newUser = new User({
      fullName,
      userName,
      email,
      password,
      age,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
