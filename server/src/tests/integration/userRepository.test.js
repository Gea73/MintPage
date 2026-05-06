import { UserRepo } from "../../repositories/userRepository.js";
import { pool } from "../../config/db.js";
import { afterAll, afterEach, beforeEach, expect, test } from "@jest/globals";
let client = await pool.connect();
const repo = new UserRepo(client);
/* eslint-disable no-undef */

describe("Tests critical queries in repository", () => {
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
  test("User is created and return the right rows", async () => {
    const user = await repo.create(
      "testuser",
      "emailteste@email.com",
      "passwordhashedtest",
    );
    expect(user).toEqual({
      id: expect.any(Number),
      username: "testuser",
      email: "emailteste@email.com",
    });
  });
  test("Password is reseted correctly", async () => {
    repo.setPasswordByEmail("rerere", "newhashpassword");
    const user = await repo.findByEmail("rerere");
    expect(user.password_hash).toBe("newhashpassword");
  });
});
