import argon2id from "argon2";
const passwordHasher = {
  hash: async function (password) {
    return await argon2id.hash(password, {
      type: argon2id.argon2id,
      memoryCost: 64*1024,
      timeCost: 2,
      parallelism: 1,
    });
  },
  verify: async function (passwordHash, password) {
    return await argon2id.verify(passwordHash, password);
  },
};

export { passwordHasher };
