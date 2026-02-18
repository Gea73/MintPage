const express = require("express");
const router = express.Router();
const loginController = require('../controllers/loginController');

//calls the controller
router.post('/',loginController);

module.exports = router;