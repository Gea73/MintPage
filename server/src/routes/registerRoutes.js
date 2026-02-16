const express = require("express");
const router = express.Router();
const registerController = require('../controllers/authController')

//calls the controller
router.post('/',registerController.registerController);

module.exports = router;