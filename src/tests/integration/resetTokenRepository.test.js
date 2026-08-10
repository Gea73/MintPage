import { ResetTokenRepo } from "../../server/repositories/resetTokenRepository.js";
import { pool } from "../../server/config/db.js";
import { afterAll, expect, test } from "@jest/globals";
/* eslint-disable no-undef */



const repo = new ResetTokenRepo(pool);

describe("Test critical queries in ResetToken Repo", () => {
  afterAll(async () => {
    await pool.query("DELETE FROM password_reset_tokens WHERE email = $1", [
      "email@email.com",
    ]);
  });
  test("Verify if reset tokens are inserted correctly and the previous token are deleted", async () => {
    await repo.create(
      "email@email.com",
      "tokenhash",
      new Date(Date.now() + 30 * 60 * 1000),
    );
    const token = await repo.findOneByEmail("email@email.com");
    expect(token.token_hash).toBe("tokenhash");
  });
});
