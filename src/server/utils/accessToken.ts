import jwt, { Jwt } from "jsonwebtoken";


const __dirname = import.meta.dirname;


const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT Secret not founded");
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


  if (typeof decoded === "string") {
    throw new Error("Invalid token payload");
  }

  if (typeof decoded.sub !== "string") {
    throw new Error("Token sub invalid");
  }

  return decoded;
}

export { generateAccessToken, verifyAccessToken };
