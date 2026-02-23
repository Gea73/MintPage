import express from "express";
const router = express.Router();
import {forgotPasswordController} from "../controllers/forgotPasswordController.js";

//calls the controller
router.post('/',forgotPasswordController);

export {router};