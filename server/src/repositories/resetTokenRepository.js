export class ResetTokenRepo {
  constructor( pool ) {
    this.pool = pool;
  }
  async create(email, tokenHash, expiration) {
    const client = await this.pool.connect();

    try {
      client.query("BEGIN");
      await this.deleteByEmail(email);

      await this.pool.query(
        "INSERT INTO password_reset_tokens (email,token_hash,expires) VALUES($1,$2,$3)",
        [email, tokenHash, expiration],
      );

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      console.error(error);
    } finally {
      client.release();
    }
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
