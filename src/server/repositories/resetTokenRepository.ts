import { Pool } from "pg";

export class ResetTokenRepo {
  pool: Pool
  constructor(pool: Pool) {
    this.pool = pool;
  }
  async create(email: string, tokenHash: string, expiration: Date) {
    await this.pool.query(
      "INSERT INTO password_reset_tokens (email,token_hash,expires) VALUES($1,$2,$3)",
      [email, tokenHash, expiration],
    );
  }


  async findOneByEmail(email: string) {
    const tokenQuery = await this.pool.query(
      "SELECT * FROM password_reset_tokens WHERE email = $1 AND expires > NOW() ORDER BY created DESC LIMIT 1",
      [email],
    );
    return tokenQuery.rows[0];
  }

  async deleteByEmail(email: string) {
    await this.pool.query(
      "DELETE FROM password_reset_tokens WHERE email = $1",
      [email],
    );
  }
}
