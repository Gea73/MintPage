import { Pool } from "pg";

export class UserRepo {
  pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }



  async create(id: string, username: string, email: string, passwordHash: string) {
    const result = await this.pool.query(
      "INSERT INTO users (id,username,email,password_hash) VALUES ($1,$2,$3,$4) RETURNING id,username,email",
      [id, username, email, passwordHash],
    );
    return result.rows[0];
  }

  async findByUsername(username: string) {
    const userQuery = await this.pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
    );
    return userQuery.rows[0];
  }

  async findByEmail(email: string) {
    const userQuery = await this.pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );
    return userQuery.rows[0];
  }

  async setPasswordByEmail(email: string, passwordHash: string) {
    return await this.pool.query(
      "UPDATE users SET password_hash = $1 WHERE email = $2",
      [passwordHash, email],
    );
  }
}
