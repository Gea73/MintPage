import express from "express";
const router = express.Router();
import { registerController } from "../container.js";

;
router.post('/',(req,res)=>registerController.handler(req,res));
export {router};