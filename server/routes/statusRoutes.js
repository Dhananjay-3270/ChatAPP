const express = require("express");
const router = express.Router();
const verifyAuth = require("../middleware/verifyAuth");
const { getStatus } = require("../controllers/status.controller");
router.get("/", verifyAuth, getStatus);
module.exports = router;
