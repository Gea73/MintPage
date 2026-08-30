import express, { Request, Response } from "express";
const router = express.Router();
import { registerController } from "../bootstrap.js";

;
router.post('/', (req: Request, res: Response) => registerController.handler(req, res));
export { router };