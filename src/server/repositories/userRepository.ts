import { Pool } from "pg";
import { UserStatus } from "../types/enums.js";
import { User } from "../models/user.js";

export class UserRepository {
  pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }

  async create(user: User) {
    const client = await this.pool.connect()
    try {
      await client.query("BEGIN");

      await client.query(
        "INSERT INTO users (id,username,email,password_hash) VALUES ($1,$2,$3,$4)",
        [user.id, user.username, user.email, user.passwordHash],
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


  async getOneById(id: string): Promise<User> {
    const query = await this.pool.query(
      "SELECT id,username,email,password_hash,status FROM users WHERE id = $1",
      [id],
    );
    const result = query.rows[0];

    return new User(result.id, result.username, result.email, result.password_hash, result.status)
  }

  async getOneByUsername(username: string): Promise<User> {
    const query = await this.pool.query(
      "SELECT id,username,email,password_hash,status FROM users WHERE username = $1",
      [username],
    );
    const result = query.rows[0];

    return new User(result.id, result.username, result.email, result.password_hash, result.status)
  }

  async getOneByEmail(email: string): Promise<User> {
    const query = await this.pool.query(
      "SELECT id,username,email,password_hash,status FROM users WHERE email = $1",
      [email],
    );
    const result = query.rows[0];

    return new User(result.id, result.username, result.email, result.password_hash, result.status)
  }


  async deleteOneById(id: string) {
    const client = await this.pool.connect()
    try {
      await client.query("BEGIN");

      await client.query("DELETE FROM users WHERE id = $1", [id])

      await client.query("COMMIT")
    } catch (error) {
      await client.query("ROLLBACK")
      throw error
    }
    finally {
      client.release()
    }


  }

  async updatePasswordById(id: string, passwordHash: string) {
    const client = await this.pool.connect()
    try {
      await client.query("BEGIN");

      await client.query("UPDATE users SET password_hash = $1 WHERE id = $2", [passwordHash, id])

      await client.query("COMMIT")
    } catch (error) {
      await client.query("ROLLBACK")
      throw error
    }
    finally {
      client.release()
    }

  }

  async updateStatusById(id: string, status: UserStatus) {
    const client = await this.pool.connect()
    try {
      await client.query("BEGIN");

      await client.query("UPDATE users SET status = $1 WHERE id = $2",
        [status, id],)

      await client.query("COMMIT")
    } catch (error) {
      await client.query("ROLLBACK")
      throw error
    }
    finally {
      client.release()
    }
  }
}
