const express = require("express");
const router = express.Router();
const verifyAuth = require("../middleware/verifyAuth");
const User = require("../models/user");
router.get("/getuser", verifyAuth, async (req, res) => {
  try {
    const allUsers = await User.find({ email: { $ne: req.user.email } }).select(
      "fullName userName _id"
    );
    res.status(200).json({ data: allUsers });
  } catch (error) {
    res.send(500).json({ error: "Failed to fetch Users" });
  }
});

module.exports = router;
