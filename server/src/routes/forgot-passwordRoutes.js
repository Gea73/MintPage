const express = require("express");
const router = express.Router();
const forgotPasswordController = require('../controllers/resetPasswordController')

//calls the controller
router.post('/',forgotPasswordController.forgotPassword);

module.exports = router;