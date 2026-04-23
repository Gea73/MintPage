export class UserService {
  constructor( userRepo, passwordHasher ) {
    this.userRepo = userRepo;
    this.passwordHasher = passwordHasher;
  }
  async createUser(user, email, password) {
    return await this.userRepo.create(
      user,
      email,
      await this.hashUserPassword(password),
    );
  }

  async findUser(username) {
    return await this.userRepo.findByUsername(username);
  }

  async findUserByEmail(email) {
    return await this.userRepo.findByEmail(email);
  }

  async hashUserPassword(password) {
    return await this.passwordHasher.hash(password);
  }

  async verifyUserPassword(passwordHash, password) {
    return await this.passwordHasher.verify(passwordHash, password);
  }

  async resetUserPassword(newPassword, email) {
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
