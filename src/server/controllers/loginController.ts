import { generateAccessToken } from "../utils/accessToken.js";
import { userSchema } from "../schemas/zodSchemas.js";
import { UserService } from "../services/userService.js";
import { Request, Response } from "express";
import { ValidationError } from "../errors/httpErrors.js";


export class LoginController {
  userService
  constructor(userService: UserService) {
    this.userService = userService;
  }
  async handler(req: Request, res: Response) {

    const result = userSchema.safeParse(req.body);

    if (!result.success) {
      throw new ValidationError("One or more fields failed validation checks.", result.error.issues.map((issue) => ({
        field: issue.path.join(".") || "body",
        message: issue.message

      })))
    }

    const username = result.data.username;
    const email = result.data.email;
    const password = result.data.password;

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
        maxAge: 30 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ message: "Login successful" });

  }
}
