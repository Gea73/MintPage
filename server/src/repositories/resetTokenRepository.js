export class ResetTokenRepo {
  constructor({ pool }) {
    this.pool = pool;
  }
  async create(email, tokenHash, expiration) {
    await this.pool.query(
      "INSERT INTO password_reset_tokens (email,token_hash,expires) VALUES($1,$2,$3)",
      [email, tokenHash, expiration],
    );
  }

  async findOneByEmail(email) {
    const tokenQuery = await this.pool.query(
      "SELECT * FROM password_reset_tokens WHERE email = $1 AND expires > NOW() ORDER BY created DESC LIMIT 1",
      [email],
    );
    return tokenQuery.rows[0];
  }

  async deleteByEmail(email) {
    await this.pool.query(
      "DELETE FROM password_reset_tokens WHERE email = $1",
      [email],
    );
  }
}
