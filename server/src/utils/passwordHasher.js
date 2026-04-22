import argon2id from "argon2";
async function hash(password){
     return await argon2id.hash(password, {
            type: argon2id.argon2id,
            memoryCost: 64 * 1024,
            timeCost: 3,
            parallelism: 1,
          });
      
}
async function verify(passwordHash,password) {
    return await argon2id.verify(passwordHash, password);
}

export {hash,verify}