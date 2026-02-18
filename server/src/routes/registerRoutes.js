const express = require("express");
const router = express.Router();
const registerController = require('../controllers/registerController');

//calls the controller
router.post('/',registerController);

module.exports = router;