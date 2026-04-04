const express = require("express");
const router = express.Router();
const verifyAuth = require("../middleware/verifyAuth");
const {
  getChatAcess,
  getMessages,
  getAllChats,
} = require("../controllers/chat.controller");
router.post("/access", verifyAuth, getChatAcess);
router.get("/chats", verifyAuth, getAllChats);
router.get("/:chatId", verifyAuth, getMessages);

module.exports = router;
