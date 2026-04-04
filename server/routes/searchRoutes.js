const express = require("express");
const router = express.Router();
const verifyAuth = require("../middleware/verifyAuth");
const { search } = require("../controllers/search.controller");

// WhatsApp-like search for messages/chats/contacts
router.get("/combine", verifyAuth, search);

module.exports = router;
