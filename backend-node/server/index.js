require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const cors = require("cors");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const app = express();
//allow app to use json
app.use(express.json());
//allow cross origin requisiton from other domains
app.use(cors());

//links the db
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

//what happens when register get post
app.post("/register", async (req, res) => {
  try {
    const { user, email, password } = req.body;
    //requisite the variables from body html
    //create a password salt
    const salt = await bcrypt.genSalt(10);
    //hash the password
    const hashPassword = await bcrypt.hash(password, salt);

    //return a newuser to the db
    const newUser = await pool.query(
      "INSERT INTO users (username,email,password_hash) VALUES ($1,$2,$3) RETURNING *",
      [user, email, hashPassword]
    );

    //send a response in json getting the row of the db
    res.json(newUser.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
//what happens when login get post
app.post("/login", async (req, res) => {
  try {
    const { user, email, password } = req.body;
    //requisite the variables from body html

    //select the user whom username is equal
    const users = await pool.query("SELECT * FROM users WHERE username = $1", [
      user,
    ]);
    //if dont find any row
    if (users.rows.length === 0)
      return res.status(401).json("User not registered");

    const userDb = users.rows[0];

    if (userDb.email !== email)
      return res.status(401).json("Email or Password does not match this user");

    const validPassword = await bcrypt.compare(password, userDb.password_hash);

    if (!validPassword) {
      return res.status(401).json("Email or Password does not match this user");
    }

    res.json("Login sucessfull");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//look if the port 5000 server is initialized
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your App Password (not your real password)
  },
});

//post of forgot password
app.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    //get email var from body

    //look for users with that email
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (users.rows.length === 0) {
      return res.json({ message: "Something went wrong" });
    }

    const user = users.rows[0];

    //create a token for unique forgot password link
    //define a random hexadecimal token
    const token = crypto.randomBytes(32).toString("hex");
    //hash the token
    const tokenHash = await bcrypt.hash(token, 10);
    //create a 30 min expiration
    const expirationDate = new Date(Date.now() + 1800000);

    await pool.query(
      "INSERT INTO password_reset_tokens (user_id,token_hash,expires) VALUES($1,$2,$3)",
      [user.id, tokenHash, expirationDate]
    );

    const resetLink = `http://localhost:5000/reset-password.html?token=${token}&id=${user.id}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Mint Page",
      html: `<p>You requested a password reset.</p>
             <p>Click this link to reset your password: <a href="${resetLink}">Reset Password</a></p>`,
    });

    res.json({ message: "Password reset link sent" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
