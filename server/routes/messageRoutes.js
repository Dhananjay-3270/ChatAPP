const express = require("express");
const router = express.Router();
const verifyAuth = require("../middleware/verifyAuth");
const User = require("../models/user");
const {
  getAllUsers,
  sendMessage,
} = require("../controllers/message.controller");

router.get("/getuser", verifyAuth, getAllUsers);
router.get("/sendMessage", verifyAuth, sendMessage);

module.exports = router;
