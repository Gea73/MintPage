import jwt from "jsonwebtoken";
import path from "node:path";
import dotenv from "dotenv";


const __dirname = import.meta.dirname;
dotenv.config({ path: path.join(__dirname, "../../.env") });

const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  // const authHeader = req.headers["authorization"];
  //const token = authHeader && authHeader.split(" ")[1];
  const cookieToken = req.cookies?.accesstoken;

  if (!cookieToken) return res.status(401).json({ message: "Invalid Token" });

  jwt.verify(cookieToken, JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Not authorized" });
   
    req.userId = decoded.sub;
    next();
  });
}

export { authenticateToken };
