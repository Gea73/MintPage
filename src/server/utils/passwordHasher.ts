import argon2id from "argon2";
export const passwordHasher = {
  hash: async function (password:string) {
    return await argon2id.hash(password, {
      type: argon2id.argon2id,
      memoryCost: 19 *1024,
      timeCost: 2,
      parallelism: 1,
    });
  },
  verify: async function (passwordHash:string, password:string) {
    return await argon2id.verify(passwordHash, password);
  },
};


