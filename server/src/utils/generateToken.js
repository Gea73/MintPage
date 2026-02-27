import jwt from "jsonwebtoken";
import path from "node:path";
import dotenv from "dotenv";

const __dirname = import.meta.dirname;
dotenv.config({ path: path.join(__dirname, "../../.env") });

const JWT_SECRET = process.env.JWT_SECRET;
function generateToken(userId) {
   
  return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: "3min" });
}

export { generateToken };
