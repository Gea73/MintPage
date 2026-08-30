import { UserRepo } from "../repositories/userRepository.js";

export class UserService {
  userRepo;
  passwordHasher;
  constructor(userRepo: UserRepo, passwordHasher: any) {
    this.userRepo = userRepo;
    this.passwordHasher = passwordHasher;
  }
  async createUser(username: string, email: string, password: string) {
    return await this.userRepo.create(
      username,
      email,
      await this.hashUserPassword(password),
    );
  }

  async findUser(username: string) {
    return await this.userRepo.findByUsername(username);
  }

  async findUserByEmail(email: string) {
    return await this.userRepo.findByEmail(email);
  }

  async hashUserPassword(password: string) {
    return await this.passwordHasher.hash(password);
  }

  async verifyUserPassword(passwordHash: string, password: string) {
    return await this.passwordHasher.verify(passwordHash, password);
  }

  async resetUserPassword(newPassword: string, email: string) {
    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const isEqualPassword = await this.verifyUserPassword(
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
