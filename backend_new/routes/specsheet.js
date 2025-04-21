const express = require('express');
const router = express.Router();
const specsheetController = require("../controllers/specsheetController")

router
.post('/specsheet', specsheetController.generateSpecSheet)

module.exports = router;