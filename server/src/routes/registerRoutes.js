import express from "express";
const router = express.Router();
import {registerController} from "../controllers/registerController.js";

//calls the controller
router.post('/',registerController);

export {router};