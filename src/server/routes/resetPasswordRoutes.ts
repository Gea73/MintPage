import express, { Request, Response } from "express";
const router = express.Router();
import { resetPasswordController } from "../bootstrap.js";

router.post("/", (req: Request, res: Response) => resetPasswordController.handler(req, res));
export { router };
