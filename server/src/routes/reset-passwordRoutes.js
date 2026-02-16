const express = require("express");
const router = express.Router();
const resetPasswordController = require('../controllers/resetPasswordController')

//calls the controller
router.post('/',resetPasswordController.resetPassword);

module.exports = router;