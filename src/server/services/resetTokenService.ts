import crypto from "crypto";
import { ResetTokenRepo } from "../repositories/resetTokenRepository.js";
import { uuidv7 } from "uuidv7";

export class ResetTokenService {
  resetTokenRepo;
  constructor(resetTokenRepo: ResetTokenRepo) {
    this.resetTokenRepo = resetTokenRepo;
  }

  async createResetToken(userId: string, tokenHash: string) {
    const id = uuidv7()
    return await this.resetTokenRepo.create(
      id,
      userId,
      tokenHash,
      new Date(Date.now() + 30 * 60 * 1000),
    );
  }

  async findResetToken(userId: string) {
    return await this.resetTokenRepo.findOne(userId);
  }

  async generateResetToken() {
    return crypto.randomBytes(32).toString("hex");
  }

  async hashResetToken(token: string) {
    return crypto.createHash("sha256").update(token).digest("hex");
  }

  async verifyResetToken(token: string, dbTokenHash: string) {
    const tokenHash = await this.hashResetToken(token);

    return crypto.timingSafeEqual(Buffer.from(tokenHash), Buffer.from(dbTokenHash))

  }
  
}
