import findUser, { verifyUserPassword } from "../models/userModel.js";
import { generateToken } from "../utils/generateRefreshToken.js";

const loginController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //select the user whom username is equal
    const user = await findUser(username);

    //if dont find any
    if (!user)
      return res.status(401).json({ message: "Error User not registered" });

    if (user.email !== email)
      return res.status(401).json({ message: "Invalid email or password" });

    //compare the password sent with the hash on DB
    const IsValidPassword = await verifyUserPassword(
      user.password_hash,
      password,
    );

    if (!IsValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user.id);

    res
      .cookie("token", token, {
        maxAge: 180000,
        httpOnly: true,
        sameSite: "strict",
      })
      .status(200)
      .json({ message: "Login successful" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export { loginController };
