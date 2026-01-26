const pool = require("../config/db");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const transporter = require('../config/mailer');

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    //get email var from body

    //look for users with that email
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (users.rows.length === 0) {
      return res.json("Something went wrong");
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
      "INSERT INTO password_reset_tokens (email,token_hash,expires) VALUES($1,$2,$3)",
      [email, tokenHash, expirationDate],
    );

    const resetLink = `http://localhost:5000/reset-password.html?token=${token}&email=${email}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Mint Page",
      html: `<p>You requested a password reset.</p>
             <p>Click this link to reset your password: <a href="${resetLink}">Reset Password</a></p>`,
    });

    res.json("Password reset link sent");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;

  // Find the token record for this user in DB
  const result = await pool.query(
    "SELECT * FROM password_reset_tokens WHERE email = $1 AND expires > NOW() ORDER BY created DESC LIMIT 1",
    [email],
  );

  if (result.rows.length === 0) {
    return res.status(400).json("Invalid or expired token");
  }

  const dbToken = result.rows[0];

  const isValid = await bcrypt.compare(token, dbToken.token_hash);
  if (!isValid) {
    return res.status(400).json("Invalid token");
  }

  const newPasswordHash = await bcrypt.hash(newPassword, 10);

  await pool.query("UPDATE users SET password_hash = $1 WHERE email = $2", [
    newPasswordHash,
    email,
  ]);
  await pool.query("DELETE FROM password_reset_tokens WHERE email = $1", [
    email,
  ]);

  res.json("Password successfully reset");
};

module.exports = {forgotPassword:forgotPassword,resetPassword:resetPassword};