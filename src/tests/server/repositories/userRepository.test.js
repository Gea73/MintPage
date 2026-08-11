import { UserRepo } from "../../../server/repositories/userRepository.js";
import { pool } from "../../../server/config/db.js";
import { expect, test } from "@jest/globals";

const repo = new UserRepo(pool);
/* eslint-disable no-undef */

describe("Tests critical queries in repository", () => {
  afterAll(async () => {
    await pool.query("DELETE FROM users WHERE email = $1", [
      "emailteste@email.com",
    ]);
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
   await repo.setPasswordByEmail("rerere", "newhashpassword");
    const user = await repo.findByEmail("rerere");
    expect(user.password_hash).toBe("newhashpassword");
  });
});
