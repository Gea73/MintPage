require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: "postgres", // Your DB User
  host: "localhost",
  database: "mint",
  password: "12345",
  port: 5433,
});

app.post("/register", async (req, res) => {
  try {
    const { user, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (username,email,password_hash) VALUES ($1,$2,$3) RETURNING *",
      [user, email, hashPassword]
    );
    res.json(newUser.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { user, email, password } = req.body;

    const users = await pool.query("SELECT * FROM users WHERE username = $1", [
      user,
    ]);
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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
