import { Request, Response } from "express";
import { rateLimit, ipKeyGenerator } from "express-rate-limit";
import { TooManyRequestError } from "../errors/httpErrors.js";




export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: false,
  legacyHeaders: false,

  keyGenerator: (req: Request) => {
    const ip = ipKeyGenerator(String(req.ip));
    return `${ip}`;
  },

  handler: () => {
    throw new TooManyRequestError()
  },

})


export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: false,
  legacyHeaders: false,

  keyGenerator: (req: Request) => {
    const ip = ipKeyGenerator(String(req.ip));
    return `${ip}`;
  },

  handler: () => {
    throw new TooManyRequestError()
  },
});
