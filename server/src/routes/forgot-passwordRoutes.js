const express = require("express");
const router = express.Router();
const forgotPasswordController = require('../controllers/forgotPasswordController');

//calls the controller
router.post('/',forgotPasswordController);

module.exports = router;