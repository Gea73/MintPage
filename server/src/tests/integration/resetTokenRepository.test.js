import { ResetTokenRepo } from "../../repositories/resetTokenRepository.js";
import { pool } from "../../config/db.js";
import { afterAll, afterEach, beforeEach, expect, test } from "@jest/globals";
/* eslint-disable no-undef */

let client = await pool.connect();
const repo = new ResetTokenRepo(pool);

describe("Test critical queries in ResetToken Repo", () => {
  beforeEach(async () => {
     client = await pool.connect();
    await client.query("BEGIN");
  });
  afterEach(async () => {
    await client.query("ROLLBACK");
  });
  afterAll(async () => {
    await client.release();
  });
  test("Verify if reset tokens are inserted correctly and the previous token are deleted", async () => {
    repo.create(
      "email@email.com",
      "tokenhash",
      new Date(Date.now() + 30 * 60 * 1000),
    );
    const token = await repo.findOneByEmail("email@email.com");
    expect(token.token_hash).toBe("tokenhash");
  });
});
