const pool = require("../config/db");
const bcrypt = require("bcrypt");


const loginController = async (req, res) => {
  try {
    const { user, email, password } = req.body;

    //select the user whom username is equal
    const users = await pool.query("SELECT * FROM users WHERE username = $1", [
      user,
    ]);

    //if dont find any
    if (users.rows.length === 0)
      return res.status(401).json({ message: "User not registered" });

    const userDb = users.rows[0];

    if (userDb.email !== email)
      return res
        .status(401)
        .json({ message: "Email or Password does not match this user" });

    //compare the password sent with the hash on DB
    const validPassword = await bcrypt.compare(password, userDb.password_hash);

    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Email or Password does not match this user" });
    }

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

 module.exports = loginController;