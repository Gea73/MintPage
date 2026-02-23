import express from "express";
const router = express.Router();
import {resetPasswordController} from "../controllers/resetPasswordController.js";

//calls the controller
router.post('/',resetPasswordController);

export {router};