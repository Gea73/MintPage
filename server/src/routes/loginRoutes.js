import express from "express";
const router = express.Router();
import {loginController} from "../controllers/loginController.js";

//calls the controller
router.post('/',loginController);

export {router};