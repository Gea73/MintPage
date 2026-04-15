//ResetPassword controller
export class ResetPasswordController {
  constructor({ userService, resetTokenService }) {
    this.userService = userService;
    this.resetTokenService = resetTokenService;
  }

  async handler(req, res) {
    const { email, token, newPassword } = req.body;

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

    if (
      !newPassword.match(/[A-Z]/) ||
      !newPassword.match(/[0-9]/) ||
      !newPassword.match(/[^A-Za-z0-9]/)
    ) {
      return res.status(400).json({ message: "Your password is not valid" });
    }

    try {
      //update the user password with the same email
      await this.userService.resetUserPassword(newPassword, email);
    } catch (error) {
      console.error(error);
      res.json({ message: `Error ${error}` });
    }

    //delete the token from DB after be used
    await this.resetTokenService.deleteResetToken(email);

    res.json({ message: "Password successfully reset" });
  }
}
