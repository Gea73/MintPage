import express from "express";
const router = express.Router();
import { resetPasswordController } from "../container.js";

router.post("/", (req, res) => resetPasswordController.handler(req, res));
export { router };
