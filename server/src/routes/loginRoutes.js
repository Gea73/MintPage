import express from "express";
const router = express.Router();
import { loginController } from "../config/container.js";

//calls the controller
router.post('/',(req,res)=>loginController.handler(req,res));

export {router};