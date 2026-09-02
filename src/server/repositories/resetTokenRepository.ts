import { Pool } from "pg";

export class ResetTokenRepo {
  pool: Pool
  constructor(pool: Pool) {
    this.pool = pool;
  }
  async create(id: string, userId: string, tokenHash: string, expiration: Date) {
    await this.pool.query(
      "INSERT INTO password_reset_tokens (id,hash,user_id,status) VALUES($1,$2,$3,$4)",
      [id, tokenHash, userId, "valid"],
    );
  }


  async findOne(userId: string) {
    const tokenQuery = await this.pool.query(
      "SELECT * FROM password_reset_tokens WHERE user_id = $1 AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1",
      [userId],
    );
    return tokenQuery.rows[0];
  }

  async deleteOne(userId: string) {
    await this.pool.query(
      "DELETE FROM password_reset_tokens WHERE user_id = $1",
      [userId],
    );
  }
}
