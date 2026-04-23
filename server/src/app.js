import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { rateLimit, ipKeyGenerator } from "express-rate-limit";
import slowDown from "express-slow-down";

const app = express();

//routers
import { router as loginRouter } from "../src/routes/loginRoutes.js";
import { router as registerRouter } from "../src/routes/registerRoutes.js";
import { router as forgotPasswordRouter } from "./routes/forgotPasswordRoutes.js";
import { router as resetPasswordRouter } from "./routes/resetPasswordRoutes.js";
import { router as dashboardRouter } from "./routes/dashboardRoutes.js";

//use helmet to more safe http headers and prevent against xss
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      objectSrc: ["'none'"],
      styleSrc: ["'self'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'", process.env.API_URL],
      frameAncestors: ["'none'"],
    },
  }),
);
//prevent referer and sniffing to dont guess the content-type
app.use(helmet.noSniff());
app.use(helmet.referrerPolicy({ policy: "no-referrer" }));

//config hsts to only accept https connections in production
if (process.env.NODE_ENV === "production") {
  app.use(
    helmet.hsts({
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    }),
  );
}
//only accept the real origin cors
app.use(
  cors({
    origin: `${process.env.API_URL}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// to work with proxies and see the client ips and not the proxy ip
// needs to be before ratelimiters otherwise every user will share the same limit so one user can block all the other users
app.set("trust proxy", 1);

//slow down rate limiter to limit max 10 requests at each 15 minutes
app.use(
  slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 3,
    delayMs: (hits) => hits * hits * 500,
  }),
);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 12,
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
  }),
);

//remove x powereb by express
app.disable("x-powered-by");
//limits json paylod to 10kb
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use("/register", registerRouter);

app.use("/login", loginRouter);

app.use("/forgot-password", forgotPasswordRouter);

app.use("/reset-password", resetPasswordRouter);

app.use("/dashboard", dashboardRouter);

const __dirname = import.meta.dirname;
//only public direct is serving static files
app.use(express.static(path.join(__dirname, "../../client/public")));


export { app };
