// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { login, register, logout } = require("../controllers/auth.controller");

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

module.exports = router;

// This route listens to GET /users
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const existingUser = await User.findOne({ email });
//     if (!existingUser) {
//       res.status(400).json({ message: "Invalid email or password" });
//       return;
//     }
//     const isMatch = password === existingUser.password;
//     if (!isMatch) {
//       res.status(400).json({ message: "Invalid Password" });
//       return;
//     }

//     const token = jwt.sign({ email, password }, secretkey);
//     res.cookie("authcookie", token, {
//       maxAge: 900000,
//       httpOnly: true,
//       sameSite: "lax", // or 'none' if using HTTPS
//       // secure: true, // uncomment if using HTTPS
//     });
//     const user = {
//       fullName: existingUser.fullName,
//       userName: existingUser.userName,
//       email: existingUser.email,
//       age: existingUser.age,
//     };
//     return res.status(200).json({ message: "Login successful", data: user });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// router.post("/register", async (req, res) => {
//   const { fullName, userName, email, password, ConfirmPassword, age } =
//     req.body;
//   try {
//     const existingUser = await User.find({ $or: [{ userName }, { email }] });
//     if (existingUser.length > 0) {
//       return res
//         .status(400)
//         .json({ error: "Username or Email already exists." });
//     }
//     const newUser = new User({
//       fullName,
//       userName,
//       email,
//       password,
//       age,
//     });

//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully." });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
// router.post("/logout", async (req, res) => {
//   try {
//     res.clearCookie("authcookie", {
//       httpOnly: true,
//     });
//     return res.status(200).json({ message: "Logout Successfull" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "Server error" });
//   }
// });
module.exports = router;
