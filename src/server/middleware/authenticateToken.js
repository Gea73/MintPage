import jwt from "jsonwebtoken";
import path from "node:path";
import dotenv from "dotenv";

const __dirname = import.meta.dirname;
dotenv.config({ path: path.join(__dirname, "../../.env") });

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT Secret not founded");
}

function authenticateToken(req, res, next) {
  // const authHeader = req.headers["authorization"];
  //const token = authHeader && authHeader.split(" ")[1];
  const cookieToken = req.cookies?.accessToken;

  if (!cookieToken) return res.status(401).json({ message: "Invalid Token" });

  try {
    const decoded = jwt.verify(cookieToken, JWT_SECRET);
    req.userId = decoded.sub;
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: "Not authorized" });
  }
}

export { authenticateToken };
