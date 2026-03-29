const express = require("express");
const router = express.Router();
const verifyAuth = require("../middleware/verifyAuth");

const {
  getAllUsers,
  sendMessage,
} = require("../controllers/message.controller");

router.get("/getuser", verifyAuth, getAllUsers);
router.post("/sendMessage", verifyAuth, sendMessage);

module.exports = router;
