import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import helmet from "helmet";
const app = express();

//routers
import { router as loginRouter } from "./routes/loginRoutes.js";
import { router as registerRouter } from "./routes/registerRoutes.js";
import { router as forgotPasswordRouter } from "./routes/forgotPasswordRoutes.js";
import { router as resetPasswordRouter } from "./routes/resetPasswordRoutes.js";
import { router as dashboardRouter } from "./routes/dashboardRoutes.js";
import { slowDowner } from "./middleware/slowDown.js";
import { apiRateLimiter, authRateLimiter } from "./middleware/rateLimiter.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";

const __dirname = import.meta.dirname;

//use helmet to more safe http headers and prevent against xss
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      objectSrc: ["'none'"],
      styleSrc: ["'self'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'", String(process.env.API_URL)],
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

//remove x powereb by express
app.disable("x-powered-by");
//limits json paylod to 10kb
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

//only public direct is serving static files
app.use(
  express.static(path.join(__dirname, "../client/public"), { index: false }),
);

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../client/public/landing-page.html"));
});



app.use("/register", authRateLimiter, slowDowner, registerRouter);

app.use("/login", authRateLimiter, slowDowner, loginRouter);

app.use("/forgot-password", authRateLimiter, slowDowner, forgotPasswordRouter);

app.use("/reset-password", authRateLimiter, slowDowner, resetPasswordRouter);

app.use("/dashboard", apiRateLimiter, slowDowner, dashboardRouter);

app.use(notFoundHandler);

app.use(errorHandler);

export { app };
