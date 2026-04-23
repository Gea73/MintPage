import express from "express";
const router = express.Router();
import { registerController } from "../config/container.js";

;
router.post('/',(req,res)=>registerController.handler(req,res));
export {router};