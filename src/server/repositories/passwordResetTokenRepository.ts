import { Pool } from "pg";
import { TokenStatus } from "../types/enums.js";
import { PasswordResetToken } from "../models/passwordResetToken.js";

export class ResetTokenRepository {
  pool: Pool
  constructor(pool: Pool) {
    this.pool = pool;
  }
  async create(passwordResetToken:PasswordResetToken) {
    const client = await this.pool.connect()

    try {
      await client.query("BEGIN");

      await client.query(
        "INSERT INTO password_reset_tokens (id,hash,user_id,status) VALUES($1,$2,$3,$4)",
        [passwordResetToken.id, passwordResetToken.hash, passwordResetToken.userId, passwordResetToken.status],
      );

      await client.query("COMMIT")
    } catch (error) {
      client.query("ROLLBACK")
      throw error;
    }
    finally {
      client.release()
    }

  }

  async getOneById(id: string): Promise<PasswordResetToken> {
    const query = await this.pool.query(
      "SELECT * FROM password_reset_tokens WHERE id = $1",
      [id],
    );
    const result = query.rows[0];

    return new PasswordResetToken(result.id, result.user_id, result.hash, result.status)
  }

  async getOneByUserId(userId: string): Promise<PasswordResetToken> {
    const query = await this.pool.query(
      "SELECT * FROM password_reset_tokens WHERE user_id = $1 AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1",
      [userId],
    );
    const result = query.rows[0];

    return new PasswordResetToken(result.id, result.user_id, result.hash, result.status)
  }

  async deleteOneById(id: string) {
    const client = await this.pool.connect()
    try {
      await client.query("BEGIN");

      await client.query(
        "DELETE FROM password_reset_tokens WHERE id = $1",
        [id],
      );

      await client.query("COMMIT")
    } catch (error) {
      client.query("ROLLBACK")
      throw error;
    }
    finally {
      client.release()
    }


  }

  async updateStatusById(id: string, status: TokenStatus) {
    const client = await this.pool.connect()
    try {
      await client.query("BEGIN");

      await client.query(
        "UPDATE password_reset_tokens SET status = $1 WHERE id = $2",
        [status, id],
      );

      await client.query("COMMIT")
    } catch (error) {
      client.query("ROLLBACK")
      throw error;
    }
    finally {
      client.release()
    }
  }

  async updateUsedAtById(id: string) {
    const client = await this.pool.connect()
    try {
      await client.query("BEGIN");

      await client.query(
        "UPDATE password_reset_tokens SET used_at = NOW() WHERE id = $1",
        [id],
      );

      await client.query("COMMIT")
    } catch (error) {
      client.query("ROLLBACK")
      throw error;
    }
    finally {
      client.release()
    }
  }
}
