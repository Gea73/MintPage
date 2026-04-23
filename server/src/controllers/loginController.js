import { generateAccessToken } from "../utils/generateAccessToken.js";
import { userSchema } from "../schemas/zodSchemas.js";

export class LoginController {
  constructor(userService ) {
    this.userService = userService;
  }
  async handler(req, res) {
    try {
      const { username, email, password } = userSchema.parse(req.body);
      const user = await this.userService.findUser(username);

      if (!user)
        return res.status(401).json({ message: "Invalid credentials" });

      if (user.email !== email)
        return res.status(401).json({ message: "Invalid credentials" });

      const IsValidPassword = await this.userService.verifyUserPassword(
        user.password_hash,
        password,
      );

      if (!IsValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const accessToken = await generateAccessToken(user.id);

      res
        .cookie("accessToken", accessToken, {
          maxAge: 15 * 60 * 1000,
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        })
        .status(200)
        .json({ message: "Login successful" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Server Error" });
    }
  }
}
