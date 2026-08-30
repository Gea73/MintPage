import express, { Request, Response } from "express";
const router = express.Router();
import { forgotPasswordController } from "../bootstrap.js";

//calls the controller
router.post('/',(req:Request,res:Response)=>forgotPasswordController.handler(req,res));

export {router};