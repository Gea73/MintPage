import { resetPasswordSchema } from "../schemas/zodSchemas.js";

export class ResetPasswordController {
  constructor(userService, resetTokenService) {
    this.userService = userService;
    this.resetTokenService = resetTokenService;
  }

  async handler(req, res) {
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
        dbToken.token_hash,
      );
      if (!isValid) {
        return res.status(400).json({ message: "Invalid token" });
      }

      //update the user password with the same email
      await this.userService.resetUserPassword(newPassword, email);

      //delete the token from DB after be used
      await this.resetTokenService.deleteResetToken(email);

      res.json({ message: "Password successfully reset" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: `Server Error` });
    }
  }
}
