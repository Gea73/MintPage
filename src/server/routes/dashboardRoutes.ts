import express, { Request, Response } from "express";
const router = express.Router();
import { authenticateToken } from "../middleware/authenticateToken.js";
import { dashboardController } from "../bootstrap.js";

//calls the controller
router.get('/', authenticateToken, (req: Request, res: Response) => dashboardController.handler(req, res));


export { router };