const express = require("express");
const router = express.Router();
const verifyAuth = require("../middleware/verifyAuth");
const { getStatus, updateStatus } = require("../controllers/status.controller");
router.get("/", verifyAuth, getStatus);
router.post("/updateStatus", verifyAuth, updateStatus);
module.exports = router;
