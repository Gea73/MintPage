

import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/accessToken.js";




function authenticateToken(req: Request, res: Response, next: NextFunction) {
  // const authHeader = req.headers["authorization"];
  //const token = authHeader && authHeader.split(" ")[1];
  try {

    const cookieToken = req.cookies?.accessToken;

    if (!cookieToken) return res.status(401).json({ message: "Invalid Token" });

    const decoded = verifyAccessToken(cookieToken);

    if (!decoded || !decoded.sub) {
      throw Error("Token sub invalid");
    }

    req.userId = decoded.sub;
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: "Not authorized" });
  }
}

export { authenticateToken };
