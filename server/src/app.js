const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();


//routers
const loginRouter = require("../src/routes/loginRoutes");
const registerRouter = require("../src/routes/registerRoutes");
const forgotPasswordRouter = require("../src/routes/forgot-passwordRoutes");
const resetPasswordRouter = require("../src/routes/reset-passwordRoutes");

//allow app to use json
app.use(express.json());
//allow cross origin requisiton from other domains
app.use(cors());

//use the routes
app.use("/register", registerRouter);

app.use("/login", loginRouter);

app.use("/forgot-password", forgotPasswordRouter);

app.use("/reset-password", resetPasswordRouter);

//allow static files 
app.use(express.static(path.join(__dirname, "../../client/public")));
app.use("/CSS",express.static(path.join(__dirname, "../../client/src/styles")));
app.use("/services",express.static(path.join(__dirname, "../../client/src/services")));
app.use("/utils",express.static(path.join(__dirname, "../../client/src/utils")));

module.exports = app;
