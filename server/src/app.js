import express from "express";
import cors from "cors";
import path from "path";
const app = express();


//routers
import {router as loginRouter} from "../src/routes/loginRoutes.js";
import {router as registerRouter} from "../src/routes/registerRoutes.js";
import {router as forgotPasswordRouter} from "./routes/forgotPasswordRoutes.js";
import {router as resetPasswordRouter} from "./routes/resetPasswordRoutes.js";

//allow app to use json
app.use(express.json());
//allow cross origin requisiton from other domains
app.use(cors());

//use the routes
app.use("/register", registerRouter);

app.use("/login", loginRouter);

app.use("/forgot-password", forgotPasswordRouter);

app.use("/reset-password", resetPasswordRouter);


const __dirname = import.meta.dirname;
//allow static files 
app.use(express.static(path.join(__dirname, "../../client/public")));
app.use("/CSS",express.static(path.join(__dirname, "../../client/src/styles")));
app.use("/services",express.static(path.join(__dirname, "../../client/src/services")));
app.use("/utils",express.static(path.join(__dirname, "../../client/src/utils")));
app.use("/src",express.static(path.join(__dirname, "../../client/src/")));

export {app};
