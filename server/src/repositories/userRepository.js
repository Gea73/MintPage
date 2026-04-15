export class UserRepo {
  constructor({ pool }) {
    this.pool = pool;
  }

  async create(user, email, passwordHash) {
    try {
      return await this.pool.query(
        "INSERT INTO users (username,email,password_hash) VALUES ($1,$2,$3) RETURNING *",
        [user, email, passwordHash],
      );
    } catch (error) {
      console.error(error);
    }
  }

  async findByUsername(user) {
    const userQuery = await this.pool.query(
      "SELECT * FROM users WHERE username = $1",
      [user],
    );
    return userQuery.rows[0];
  }

  async findByEmail(email) {
    const userQuery = await this.pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );
    return userQuery.rows[0];
  }

  async setPasswordByEmail(email, passwordHash) {
    return await this.pool.query(
      "UPDATE users SET password_hash = $1 WHERE email = $2",
      [passwordHash, email],
    );
  }
}
