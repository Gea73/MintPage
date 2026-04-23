import { userSchema } from "../schemas/zodSchemas.js";

export class RegisterController {
  constructor(userService) {
    this.userService = userService;
  }
  async handler(req, res) {
    try {
      const { username, email, password } = userSchema.parse(req.body);
      //request the variables from body html

      if (!username || !email || !password) {
        return res.status(400).json({ message: "Your data is not valid" });
      }
      //insert the new user on DB
      const newUser = await this.userService.createUser(
        username,
        email,
        password,
      );

      if (!newUser) {
        return res.status(500).json({ message: "User register failed" });
      }
      return res.status(201).json({ message: "User Registred Successfully" });
    } catch (error) {
      //if a user or email is already in db
      if (error.code === "23505") {
        return res.status(409).json({ message: "User or email already used" });
      }
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
}
