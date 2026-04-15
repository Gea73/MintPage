import { error } from "node:console";
import { pool } from "../config/db.js";
import argon2id from "argon2";

async function createUser(user, email, password) {
  try {
    return await pool.query(
      "INSERT INTO users (username,email,password_hash) VALUES ($1,$2,$3) RETURNING *",
      [user, email, hashUserPassword(password)],
    );
  } catch (error) {
    console.error(error);
  }
}

async function findUser(user) {
  const userQuery = await pool.query(
    "SELECT * FROM users WHERE username = $1",
    [user],
  );
  return userQuery.rows[0];
}

async function findUserByEmail(email) {
  const userQuery = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return userQuery.rows[0];
}

async function hashUserPassword(password) {
  try {
    return await await argon2id.hash(password, {
      type: argon2id.argon2id,
      memoryCost: 64 * 1024,
      timeCost: 3,
      parallelism: 1,
    });
  } catch (error) {
    console.error(error);
  }
}

async function verifyUserPassword(passwordHash, password) {
  await argon2id.verify(passwordHash, password);
}

async function resetUserPassword(newPassword, email) {
  const user = await findUserByEmail(email);

  const isEqualPassword = verifyUserPassword(user.password_hash, newPassword);
  if (isEqualPassword) {
    throw new error("The new password is equal to the old");
  }

  const newPasswordHash = await hashUserPassword(newPassword);

  await pool.query("UPDATE users SET password_hash = $1 WHERE email = $2", [
    newPasswordHash,
    email,
  ]);
}

export {
  createUser,
  findUser,
  findUserByEmail,
  verifyUserPassword,
  resetUserPassword,
};
