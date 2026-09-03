

import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/accessToken.js";
import { UnauthorizedError } from "../errors/httpErrors.js";




function authenticateToken(req: Request, res: Response, next: NextFunction) {
  // const authHeader = req.headers["authorization"];
  //const token = authHeader && authHeader.split(" ")[1];

  const cookieToken = req.cookies?.accessToken;

  if (!cookieToken) {
    throw new UnauthorizedError("Invalid Token")
  }

  const decoded = verifyAccessToken(cookieToken);

  if (!decoded || !decoded.sub) {
    throw new Error("Token sub invalid");
  }

  req.userId = decoded.sub;
  next();

}

export { authenticateToken };
