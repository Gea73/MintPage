import { transporter } from "../config/mailer.js";

import { emailSchema } from "../schemas/zodSchemas.js";
import { UserService } from "../services/userService.js";
import { ResetTokenService } from "../services/resetTokenService.js";
import { Request, Response } from "express";


const __dirname = import.meta.dirname;
const API_URL = process.env.API_URL;

//forgotPassword controller

export class ForgotPasswordController {
  userService
  resetTokenService
  constructor(userService: UserService, resetTokenService: ResetTokenService) {
    this.userService = userService;
    this.resetTokenService = resetTokenService;
  }

  async handler(req: Request, res: Response) {
    try {
      const result = emailSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({ message: "Your data is not valid" });
      }
      const email = result.data.email;
      
      const user = await this.userService.findUserByEmail(email);

      if (!user) {
        return res.json({ message: "If this email is registered, a password reset link has been sent" });
      }

      const token = await this.resetTokenService.generateResetToken();
      const tokenHash = await this.resetTokenService.hashResetToken(token);
      
      await this.resetTokenService.createResetToken(user.id, tokenHash);

      const resetLink = `${API_URL}/reset-password.html?token=${token}&email=${email}`;

      //use nodemailer to send the email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset Mint Page",
        html: `<p>You requested a password reset.</p>
             <p>Click this link to reset your password: <a href="${resetLink}">Reset Password</a></p>`,
      });

      res.json({ message: "If this email is registered, a password reset link has been sent" });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ message: "Server Error" });
    }
  }
}
