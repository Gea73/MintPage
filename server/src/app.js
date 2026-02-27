import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
const app = express();


//routers
import {router as loginRouter} from "../src/routes/loginRoutes.js";
import {router as registerRouter} from "../src/routes/registerRoutes.js";
import {router as forgotPasswordRouter} from "./routes/forgotPasswordRoutes.js";
import {router as resetPasswordRouter} from "./routes/resetPasswordRoutes.js";
import {router as dashboardRouter} from "./routes/dashboardRoutes.js";
//allow app to use json
app.use(express.json());
//allow cross origin requisiton from other domains
app.use(cors());
//allow cookie parsing
app.use(cookieParser())

//use the routes
app.use("/register", registerRouter);

app.use("/login", loginRouter);

app.use("/forgot-password", forgotPasswordRouter);

app.use("/reset-password", resetPasswordRouter);

app.use("/dashboard",dashboardRouter);


const __dirname = import.meta.dirname;
//allow static files 
app.use(express.static(path.join(__dirname, "../../client/public")));
app.use("/CSS",express.static(path.join(__dirname, "../../client/src/styles")));
app.use("/services",express.static(path.join(__dirname, "../../client/src/services")));
app.use("/utils",express.static(path.join(__dirname, "../../client/src/utils")));
app.use("/config",express.static(path.join(__dirname, "../../client/src/config")));

export {app};
