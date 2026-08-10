import { rateLimit, ipKeyGenerator } from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  keyGenerator: (req) => {
    const ip = ipKeyGenerator(req.ip);
    const userId = req.user?.id || "guest";
    return `${ip}:${userId}`;
  },
  standardHeaders: false,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({ message: "Too many requests" });
  },
});
