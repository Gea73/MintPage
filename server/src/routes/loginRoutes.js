const express = require("express");
const router = express.Router();
const loginController = require('../controllers/authController')

//calls the controller
router.post('/',loginController.loginController);

module.exports = router;