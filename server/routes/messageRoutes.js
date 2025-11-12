const express = require("express");
const router = express.Router();
const verifyAuth = require("../middleware/verifyAuth");
const User = require("../models/user");
const {
  getAllUsers,
  getChatAcess,
} = require("../controllers/message.controller");

router.get("/getuser", verifyAuth, getAllUsers);

router.get("/getChatAcess", verifyAuth, getChatAcess);

module.exports = router;
