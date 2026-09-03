import slowDown from "express-slow-down";

//slow down rate limiter to limit max 10 requests at each 15 minutes
export const slowDowner = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 50,
  delayMs: (hits) => hits * 700,
});
