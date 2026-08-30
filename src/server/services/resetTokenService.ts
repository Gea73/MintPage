import crypto from "crypto";
import { ResetTokenRepo } from "../repositories/resetTokenRepository.js";

export class ResetTokenService {
  resetTokenRepo;
  constructor( resetTokenRepo:ResetTokenRepo ) {
    this.resetTokenRepo = resetTokenRepo;
  }

  async createResetToken(email:string, tokenHash:string) {
    
    return await this.resetTokenRepo.create(
      email,
      tokenHash,
      new Date(Date.now() +  30*60*1000),
    );
  }

  async findResetToken(email:string) {
    return await this.resetTokenRepo.findOneByEmail(email);
  }

  async generateResetToken() {
    return  crypto.randomBytes(32).toString("hex");
  }

  async hashResetToken(token:string) {
    return crypto.createHash("sha256").update(token).digest("hex");
  }

  async verifyResetToken(token:string, dbTokenHash:string) {
    const tokenHash = await this.hashResetToken(token);
    return tokenHash === dbTokenHash;
 
  }

  async deleteResetToken(email:string) {
    return await this.resetTokenRepo.deleteByEmail(email);
  }
}
