const express = require("express");
const router = express.Router();
const verifyAuth = require("../middleware/verifyAuth");
const { getChatAcess, getMessages } = require("../controllers/chat.controller");
router.get("/access", verifyAuth, getChatAcess);
router.get("/:chatId", verifyAuth, getMessages);

module.exports = router;
