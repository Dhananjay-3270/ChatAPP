const express = require("express");
const router = express.Router();
const verifyAuth = require("../middleware/verifyAuth");
const { getConfigDetails } = require("../controllers/config.controller");
router.get("/config", verifyAuth, getConfigDetails);
module.exports = router;
