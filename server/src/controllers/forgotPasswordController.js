import { transporter } from "../config/mailer.js";
import path from "node:path";
import dotenv from "dotenv";

const __dirname = import.meta.dirname;
dotenv.config({ path: path.join(__dirname, "../../.env") });
const API_URL = process.env.API_URL;

//forgotPassword controller

export class ForgotPasswordController {
  constructor({ userService, resetTokenService }) {
    this.userService = userService;
    this.resetTokenService = resetTokenService;
  }

  async handler(req, res) {
    try {
      const { email } = req.body;

      const user = await this.userService.findUserByEmail(email);

      if (!user) {
        return res.json({ message: "Something went wrong" });
      }

      const token = await this.resetTokenService.generateResetToken();
      const tokenHash = await this.resetTokenService.hashResetToken(token);

      await this.resetTokenService.createResetToken(email, tokenHash);

      const resetLink = `${API_URL}/reset-password.html?token=${token}&email=${email}`;

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
      res.status(500).json({ message: "Server Error" });
    }
  }
}
