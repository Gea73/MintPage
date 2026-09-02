import jwt, { Jwt } from "jsonwebtoken";


const __dirname = import.meta.dirname;


const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET undefined");
}

function generateAccessToken(userId: string) {
  return jwt.sign({ sub: userId }, String(JWT_SECRET), {
    issuer: "https://www.mint.com",
    audience: "mint-api",
    expiresIn: "30m",
  });
}

function verifyAccessToken(token: string) {
  const decoded = jwt.verify(token, String(JWT_SECRET), {
    issuer: "https://www.mint.com",
    audience: "mint-api",
  });


  if (typeof decoded === "string" || !decoded) {
    throw new Error("Token payload is invalid");
  }

  if (typeof decoded.sub !== "string" || !decoded.sub) {
    throw new Error("Token Sub is invalid");
  }

  return decoded;
}

export { generateAccessToken, verifyAccessToken };
