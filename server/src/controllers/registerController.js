import { pool } from "../config/db.js";
import argon2id from "argon2";

const registerController = async (req, res) => {
  try {
    const { user, email, password } = req.body;
    //request the variables from body html

    if (
      !password.match(/[A-Z]/) ||
      !password.match(/[0-9]/) ||
      !password.match(/[^A-Za-z0-9]/)
    ) {
      return res.status(400).json({ message: "Your password is not valid" });
    }

    //hash the password
    const hashPassword = await await argon2id.hash("password", {
      type: argon2id.argon2id,
      memoryCost: 64 * 1024,
      timeCost: 3,
      parallelism: 1,
    });

    //insert the new user on DB
    const newUser = await pool.query(
      "INSERT INTO users (username,email,password_hash) VALUES ($1,$2,$3) RETURNING *",
      [user, email, hashPassword],
    );

    if (newUser) {
      res.json({ message: "User Registred Successfully" });
    } else {
      res.json({ message: "User register failed" });
    }
  } catch (error) {
    //if a user or email is already in db
    if (error.code === "23505") {
      return res.status(409).json({ message: "User or email already used" });
    }

    console.error(error.message);

    res.status(500).json({ message: "Server Error" });
  }
};

export { registerController };
