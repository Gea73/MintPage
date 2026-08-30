import express, { Request, Response } from "express";
const router = express.Router();
import { loginController } from "../bootstrap.js";

//calls the controller
router.post('/',(req:Request,res:Response)=>loginController.handler(req,res));

export {router};