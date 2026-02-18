const pool = require("../config/db");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const transporter = require("../config/mailer");

//forgotPassword controller
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    //get email from body

    //look for users with that email
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    //if query didnt find
    if (users.rows.length === 0) {
      return res.json({ message: "Something went wrong" });
    }

    //create a token for unique forgot password link
    //define a random hexadecimal token
    const token = crypto.randomBytes(32).toString("hex");
    //hash the token
    const tokenHash = await bcrypt.hash(token, 10);
    //create a 30 min expiration
    const expirationDate = new Date(Date.now() + 1800000);

    //insert the token on database
    await pool.query(
      "INSERT INTO password_reset_tokens (email,token_hash,expires) VALUES($1,$2,$3)",
      [email, tokenHash, expirationDate],
    );

    //set the reset url with the token and email
    const resetLink = `http://localhost:5000/reset-password.html?token=${token}&email=${email}`;

    //use nodemailer to send the email
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
};


module.exports = forgotPassword;