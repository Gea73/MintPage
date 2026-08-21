import jwt from "jsonwebtoken";
import path from "node:path";
import dotenv from "dotenv";

const __dirname = import.meta.dirname;
dotenv.config({ path: path.join(__dirname, "../../.env") });

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT Secret not founded");
}

function generateAccessToken(userId) {
  return jwt.sign({ sub: userId }, JWT_SECRET, {
    issuer: "https://www.mint.com",
    audience: "mint-api",
    expiresIn: "30min",
  });
}

function verifyAccessToken(token) {
  const tokenDecoded = jwt.verify(token, JWT_SECRET, {
    issuer: "https://www.mint.com",
    audience: "mint-api",
  });
  return tokenDecoded;
}

export { generateAccessToken ,verifyAccessToken};
