  import crypto from "crypto";
import bcrypt from "bcrypt";
  
  async function generateResetTokenHash() {
    const token = crypto.randomBytes(32).toString("hex");
    return await bcrypt.hash(token, 10);
  }
  
  export {generateResetTokenHash};
   
