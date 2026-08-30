import { Request, Response } from "express";
import { rateLimit, ipKeyGenerator } from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  keyGenerator: (req: Request) => {
    const ip = ipKeyGenerator(String(req.ip));
    return `${ip}`;
  },

  standardHeaders: false,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({ message: "Too many requests" });
  },
});
