import { pool } from "../config/db.js";
import bcrypt from "bcrypt";
async function createResetToken(email, tokenHash) {
  await pool.query(
    "INSERT INTO password_reset_tokens (email,token_hash,expires) VALUES($1,$2,$3)",
    [email, tokenHash, new Date(Date.now() + 1800000)],
  );
}

async function findResetToken(email) {
  const tokenQuery = await pool.query(
    "SELECT * FROM password_reset_tokens WHERE email = $1 AND expires > NOW() ORDER BY created DESC LIMIT 1",
    [email],
  );
  return tokenQuery[0];
}

async function verifyResetToken(token,tokenHash) {
 return bcrypt.compare(token, tokenHash);

}

async function deleteResetToken(email) {
  await pool.query("DELETE FROM password_reset_tokens WHERE email = $1", [
    email,
  ]);
}

export { createResetToken, findResetToken,verifyResetToken,deleteResetToken };
