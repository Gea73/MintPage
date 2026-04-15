import { transporter } from "../config/mailer.js";

import path from "node:path";
import dotenv from "dotenv";
import { findUserByEmail } from "../models/userModel.js";
import { generateResetTokenHash } from "../utils/generateResetToken.js";
import { createResetToken } from "../models/resetTokenModel.js";

const __dirname = import.meta.dirname;
dotenv.config({ path: path.join(__dirname, "../../.env") });

const API_URL = process.env.API_URL;

//forgotPassword controller
const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.json({ message: "Something went wrong" });
    }

    const tokenHash = await generateResetTokenHash();
   await createResetToken(email, tokenHash);

    const resetLink = `${API_URL}/reset-password.html?token=${tokenHash}&email=${email}`;

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
    res.status(500).json({ messafe: "Server Error" });
  }
};

export { forgotPasswordController };
