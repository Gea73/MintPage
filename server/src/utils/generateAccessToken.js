import jwt from "jsonwebtoken";
import path from "node:path";
import dotenv from "dotenv";
import { error } from "node:console";

const __dirname = import.meta.dirname;
dotenv.config({ path: path.join(__dirname, "../../.env") });

const JWT_SECRET = process.env.JWT_SECRET;
if(!JWT_SECRET){
  throw new error("JWT Secret not founded");
}


function generateAccessToken(userId) {
   
  return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: "3min" });
}

export { generateAccessToken };
