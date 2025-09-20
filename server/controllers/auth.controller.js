const User = require("../models/user");
const jwt = require("jsonwebtoken");

const secretkey = process.env.JWT_SECRET;

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = password === existingUser.password;
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ email, password }, secretkey);
    res.cookie("authcookie", token, {
      maxAge: 900000,
      httpOnly: true,
      sameSite: "lax", // or 'none' if using HTTPS
      // secure: true, // uncomment if using HTTPS
    });
    const user = {
      fullName: existingUser.fullName,
      userName: existingUser.userName,
      email: existingUser.email,
      age: existingUser.age,
    };
    return res.status(200).json({ message: "Login successful", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Register Controller
const register = async (req, res) => {
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
    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Logout Controller
const logout = async (req, res) => {
  try {
    res.clearCookie("authcookie", {
      httpOnly: true,
    });
    return res.status(200).json({ message: "Logout Successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
};
module.exports = { login, register, logout };
