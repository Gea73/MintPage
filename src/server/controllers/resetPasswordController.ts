import { Request, Response } from "express";
import { resetPasswordSchema } from "../schemas/zodSchemas.js";
import { ResetTokenService } from "../services/resetTokenService.js";
import { UserService } from "../services/userService.js";
import { UnauthorizedError } from "../errors/httpErrors.js";

export class ResetPasswordController {
  userService;
  resetTokenService;
  constructor(userService: UserService, resetTokenService: ResetTokenService) {
    this.userService = userService;
    this.resetTokenService = resetTokenService;
  }

  async handler(req: Request, res: Response) {
    try {
      const { email, token, newPassword } = resetPasswordSchema.parse(req.body);

      if (!email || !token || !newPassword) {
        return res.status(400).json({ message: "Your data is not valid" });
      }

      // Find the most recent token associate with the email in DB
      const dbToken = await this.resetTokenService.findResetToken(email);

      if (!dbToken) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      //validate the token
      const isValid = await this.resetTokenService.verifyResetToken(
        token,
        dbToken.hash,
      );
      if (!isValid) {
        throw new UnauthorizedError("Invalid Token")

      }

      //update the user password with the same email
      await this.userService.resetUserPassword(newPassword, email);



      res.json({ message: "Password successfully reset" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: `Server Error` });
    }
  }
}
