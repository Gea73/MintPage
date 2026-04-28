import { pool } from "../config/db.js";
import { expect, test } from "@jest/globals";
/* eslint-disable no-undef */

describe("DB Connection test", () => {
  test("DB is correctly being connected", async () => {
    const client = await pool.connect();
    expect(client).toBeTruthy();
    client.release();
  });
});
