import express from "express";
const router = express.Router();
import { forgotPasswordController } from "../container.js";

//calls the controller
router.post('/',(req,res)=>forgotPasswordController.handler(req,res));

export {router};