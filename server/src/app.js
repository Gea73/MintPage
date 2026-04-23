import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import helmet from "helmet";
const app = express();

//routers
import { router as loginRouter } from "../src/routes/loginRoutes.js";
import { router as registerRouter } from "../src/routes/registerRoutes.js";
import { router as forgotPasswordRouter } from "./routes/forgotPasswordRoutes.js";
import { router as resetPasswordRouter } from "./routes/resetPasswordRoutes.js";
import { router as dashboardRouter } from "./routes/dashboardRoutes.js";
import { slowDowner } from "./middleware/slowDown.js";
import { rateLimiter } from "./middleware/rateLimit.js";

const __dirname = import.meta.dirname;

//use helmet to more safe http headers and prevent against xss
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      objectSrc: ["'none'"],
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
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

//remove x powereb by express
app.disable("x-powered-by");
//limits json paylod to 10kb
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

//only public direct is serving static files
app.use(
  express.static(path.join(__dirname, "../../client/public"), { index: false }),
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/public/landing-page.html"));
});

const requestLimiter = [slowDowner, rateLimiter];

app.use("/register", requestLimiter, registerRouter);

app.use("/login", requestLimiter, loginRouter);

app.use("/forgot-password", requestLimiter, forgotPasswordRouter);

app.use("/reset-password", requestLimiter, resetPasswordRouter);

app.use("/dashboard", requestLimiter, dashboardRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server Error" });
});

export { app };
