const express = require("express");
const router = express.Router();
const verifyAuth = require("../middleware/verifyAuth");
const { search } = require("../controllers/search.controller");
router.get("/users", verifyAuth, search);
module.exports = router;
