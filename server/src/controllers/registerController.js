export class RegisterController {
  constructor({ userService }) {
    this.userService = userService;
  }
  async handler(req, res) {
    try {
      const { user, email, password } = req.body;
      //request the variables from body html

      if (
        !password.match(/[A-Z]/) ||
        !password.match(/[0-9]/) ||
        !password.match(/[^A-Za-z0-9]/)
      ) {
        return res.status(400).json({ message: "Your password is not valid" });
      }
      //insert the new user on DB
      const newUser = await this.userService.createUser(user, email, password);

      if (!newUser) {
          res.status(500).json({ message: "User register failed" });      
      
      }
       res.status(201).json({ message: "User Registred Successfully" });
    } catch (error) {
      //if a user or email is already in db
      if (error.code === "23505") {
        return res.status(409).json({ message: "User or email already used" });
      }

      res.status(500).json({ message: "Server Error" });
    }
  }
}
