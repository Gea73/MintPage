import { generateAccessToken } from "../utils/accessToken.js";
import { userSchema } from "../schemas/zodSchemas.js";
import { UserService } from "../services/userService.js";
import { Request, Response } from "express";

export class LoginController {
  userService
  constructor(userService: UserService) {
    this.userService = userService;
  }
  async handler(req: Request, res: Response) {
    try {
      const { username, email, password } = userSchema.parse(req.body);

      if (!username || !email || !password) {
        return res.status(400).json({ message: "Your data is not valid" });
      }

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
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ message: "Server Error" });
    }
  }
}
