import express from "express";
const router = express.Router();
import { authenticateToken } from "../middleware/authenticateToken.js";
import { dashboardController } from "../config/container.js";

//calls the controller
router.get('/',authenticateToken,(req,res)=>dashboardController.handler(req,res));


export {router};