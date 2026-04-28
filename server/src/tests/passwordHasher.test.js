import { passwordHasher } from "../utils/passwordHasher.js";
import { expect, test } from "@jest/globals";
/* eslint-disable no-undef */
describe("Password hasher test", () => {
  test("Hasher is hashing and verifying correctly", async () => {
    const hash = await passwordHasher.hash("ddsdsfffdfsdfs");
    const result = await passwordHasher.verify(hash, "ddsdsfffdfsdfs");
    expect(result).toBe(true);
  });

  test("Hasher is rejecting wrong passwords", async () => {
    const hash = await passwordHasher.hash("usdusd");
    const result = await passwordHasher.verify(hash, "ddsdsfffdfsdfs");
    expect(result).toBe(false);
  });
});
