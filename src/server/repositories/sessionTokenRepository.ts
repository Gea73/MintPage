import { Pool } from "pg";
import { TokenStatus } from "../types/enums.js";
import { SessionToken } from "../models/sessionToken.js";

export class SessionTokenRepository {
  pool: Pool
  constructor(pool: Pool) {
    this.pool = pool;
  }
  async create(sessionToken:SessionToken) {
    const client = await this.pool.connect()

    try {
      await client.query("BEGIN");

      await client.query(
        "INSERT INTO session_tokens (id,hash,user_id,status) VALUES($1,$2,$3,$4)",
        [sessionToken.id, sessionToken.hash, sessionToken.userId, sessionToken.status],
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

  async getOneById(id: string): Promise<SessionToken> {
    const query = await this.pool.query(
      "SELECT * FROM session_tokens WHERE id = $1",
      [id],
    );
    const result = query.rows[0];

    return new SessionToken(result.id, result.user_id, result.hash, result.status)
  }

  async getOneByUserId(userId: string): Promise<SessionToken> {
    const query = await this.pool.query(
      "SELECT * FROM session_tokens WHERE user_id = $1 AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1",
      [userId],
    );
    const result = query.rows[0];

    return new SessionToken(result.id, result.user_id, result.hash, result.status)
  }

  async deleteOneById(id: string) {
    const client = await this.pool.connect()
    try {
      await client.query("BEGIN");

      await client.query(
        "DELETE FROM session_tokens WHERE id = $1",
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
        "UPDATE session_tokens SET status = $1 WHERE id = $2",
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
        "UPDATE session_tokens SET used_at = NOW() WHERE id = $1",
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
