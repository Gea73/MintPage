const pool = require("../config/db");
const bcrypt = require("bcrypt");


const registerController = async (req, res) => {
  try {
    const { user, email, password } = req.body;
    //requisite the variables from body html
    //create a password salt
    const salt = await bcrypt.genSalt(10);
    //hash the password
    const hashPassword = await bcrypt.hash(password, salt);

    //return a newuser to the db
    const newUser = await pool.query(
      "INSERT INTO users (username,email,password_hash) VALUES ($1,$2,$3) RETURNING *",
      [user, email, hashPassword],
    );

    //send a response in json getting the row of the db
    res.json(newUser.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({message:"User or email already used"});
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const loginController = async (req, res) => {
  try {
    const { user, email, password } = req.body;
    //requisite the variables from body html

    //select the user whom username is equal
    const users = await pool.query("SELECT * FROM users WHERE username = $1", [
      user,
    ]);
    //if dont find any row
    if (users.rows.length === 0)
      return res.status(401).json({message:"User not registered"});

    const userDb = users.rows[0];

    if (userDb.email !== email)
      return res.status(401).json({message:"Email or Password does not match this user"});

    const validPassword = await bcrypt.compare(password, userDb.password_hash);

    if (!validPassword) {
      return res.status(401).json({message:"Email or Password does not match this user"});
    }

    res.json({message:"Login sucessfull"});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {registerController:registerController,loginController:loginController};