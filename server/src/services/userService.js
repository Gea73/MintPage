
import argon2id from "argon2";

export class UserService {
  constructor({ userRepo }) {
    this.userRepo = userRepo;
  }
  async createUser(user, email, password) {
    return await this.userRepo.create(
      user,
      email,
      await this.hashUserPassword(password),
    );
  }

  async findUser(user) {
    return await this.userRepo.findByUsername(user);
  }

  async findUserByEmail(email) {
    return await this.userRepo.findByEmail(email);
  }

  async hashUserPassword(password) {
   
      return await argon2id.hash(password, {
        type: argon2id.argon2id,
        memoryCost: 64 * 1024,
        timeCost: 3,
        parallelism: 1,
      });
  
  }

  async verifyUserPassword(passwordHash, password) {
     return await argon2id.verify(passwordHash, password);
  }

  async resetUserPassword(newPassword, email) {
    const user = await this.userRepo.findByEmail(email);

    if(!user){
      throw new Error("User not found");
    }

    const isEqualPassword =await this.verifyUserPassword(
      user.password_hash,
      newPassword,
    );
    if (isEqualPassword) {
      throw new Error("The new password is equal to the old");
    }

    const newPasswordHash = await this.hashUserPassword(newPassword);
    await this.userRepo.setPasswordByEmail(email, newPasswordHash);
  }
}
