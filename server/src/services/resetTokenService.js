import crypto from "crypto";

export class ResetTokenService {
  constructor({ resetTokenRepo }) {
    this.resetTokenRepo = resetTokenRepo;
  }

  async createResetToken(email, tokenHash) {
    
    return await this.resetTokenRepo.create(
      email,
      tokenHash,
      new Date(Date.now() +  30*60*1000),
    );
  }

  async findResetToken(email) {
    return await this.resetTokenRepo.findOneByEmail(email);
  }

  async generateResetToken() {
    return  crypto.randomBytes(32).toString("hex");
  }

  async hashResetToken(token) {
    return crypto.createHash("sha256").update(token).digest("hex");
  }

  async verifyResetToken(token, dbTokenHash) {
    const tokenHash = await this.hashResetToken(token);
    return tokenHash === dbTokenHash;
 
  }

  async deleteResetToken(email) {
    return await this.resetTokenRepo.deleteByEmail(email);
  }
}
