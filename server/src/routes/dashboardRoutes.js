import express from "express";
const router = express.Router();
import { dashboardController } from "../controllers/dashboardController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

//calls the controller
router.get('/',authenticateToken,dashboardController);


export {router};