import nodemailer from "nodemailer";
import path from "node:path";
import dotenv from "dotenv";

const __dirname = import.meta.dirname;
dotenv.config({path:path.join(__dirname,"../../.env")});


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, //  email
    pass: process.env.EMAIL_PASS, //  App Password
  },
});

export {transporter};