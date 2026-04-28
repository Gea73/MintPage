/* eslint-disable no-undef */

import { userSchema, resetPasswordSchema } from "../schemas/zodSchemas.js";
import { expect, test } from "@jest/globals";

describe("Password Schema validation tests", () => {
  test("Accept a valid user", () => {
    const result = userSchema.safeParse({
      username: "lulu",
      email: "email@email.com",
      password: "StrongPassword!1",
    });
    expect(result.success).toBe(true);
  });

  test("Rejects a password without a number", () => {
    const result = userSchema.safeParse({
      username: "lulu",
      email: "email@email.com",
      password: "StrongPassword!!!",
    });
    expect(result.success).toBe(false);
  });

  test("Rejects a password without a special char", () => {
    const result = userSchema.safeParse({
      username: "lulu",
      email: "email@email.com",
      password: "StrongPassword111",
    });
    expect(result.success).toBe(false);
  });
});

describe("Reset Password Schema validation tests", () => {
  test("Accept a valid password and token", () => {
    const result = resetPasswordSchema.safeParse({
      email: "email@email.com",
      token: "a9f3c7a1e4b8d2c6f5a0e9b7d3c1f8a2e6d4b0c9f7a3e1d5c8b2f6a4e0d9c3b7",
      newPassword: "StrongPassword!1",
    });

    expect(result.success).toBe(true);
  });

  test("Rejects a password without a number", () => {
    const result = resetPasswordSchema.safeParse({
      email: "email@email.com",
      token: "a9f3c7a1e4b8d2c6f5a0e9b7d3c1f8a2e6d4b0c9f7a3e1d5c8b2f6a4e0d9c3b7",
      newPassword: "StrongPassword!!",
    });
    expect(result.success).toBe(false);
  });

  test("Rejects a password without a special char", () => {
    const result = resetPasswordSchema.safeParse({
      email: "email@email.com",
      token: "a9f3c7a1e4b8d2c6f5a0e9b7d3c1f8a2e6d4b0c9f7a3e1d5c8b2f6a4e0d9c3b7",
      newPassword: "StrongPassword11",
    });
    expect(result.success).toBe(false);
  });

  test("Rejects a token with the wrong length", () => {
    const result = resetPasswordSchema.safeParse({
      email: "email@email.com",
      token: "a9f3c7a1e4b8d2c6f5a0e9b7d3cd4b0c9f7a3e1d5c8b2f6a4e0d9c3b7",
      newPassword: "StrongPassword11!!",
    });
    expect(result.success).toBe(false);
  });

  test("Rejects a token with the invalid characters", () => {
    const result = resetPasswordSchema.safeParse({
      email: "email@email.com",
      token: "a!@.c7a1e4b8d2c6f5a0e9b7d3c1f8a2e6d4b0c9f7a3e1d5c8b2f6a4e0d9c3b7",
      newPassword: "StrongPassword11!!",
    });
    expect(result.success).toBe(false);
  });
});
