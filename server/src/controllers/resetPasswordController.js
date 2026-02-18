const pool = require("../config/db");
const bcrypt = require("bcrypt");



//ResetPassword controller
const resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;

  // Find the most recent token associate with the email in DB
  const result = await pool.query(
    "SELECT * FROM password_reset_tokens WHERE email = $1 AND expires > NOW() ORDER BY created DESC LIMIT 1",
    [email],
  );

  if (result.rows.length === 0) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  const dbToken = result.rows[0];

  //validate the token
  const isValid = await bcrypt.compare(token, dbToken.token_hash);
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


  //Hash the new password
  const newPasswordHash = await bcrypt.hash(newPassword, 10);

  //update the user password with the same email
  await pool.query("UPDATE users SET password_hash = $1 WHERE email = $2", [
    newPasswordHash,
    email,
  ]);
  //delete the token from DB after be used
  await pool.query("DELETE FROM password_reset_tokens WHERE email = $1", [
    email,
  ]);

  res.json({ message: "Password successfully reset" });
};

module.exports = resetPassword;
