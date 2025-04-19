import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "config";
import TwitterError from "../../errors/twitter-error";
import { StatusCodes } from "http-status-codes";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userRole?: string;
    }
  }
}

export function extractUserFromToken(req: Request, res: Response, next: NextFunction) {
  try {
    const secret = config.get<string>("app.jwtSecret");
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new TwitterError(StatusCodes.UNAUTHORIZED, "Missing or invalid token");
    }

    const jwt = authHeader.split(" ")[1];
    const decoded = verify(jwt, secret) as { id: string; role: string };

    req.userId = decoded.id;
    req.userRole = decoded.role;

    next();
  } catch (e) {
    console.error("JWT verification failed:", e);
    return next(new TwitterError(StatusCodes.UNAUTHORIZED, "Invalid or expired token"));
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.userId) {
    return next(new TwitterError(StatusCodes.UNAUTHORIZED, "Authentication required"));
  }
  next();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.userId || req.userRole !== "admin") {
    return next(new TwitterError(StatusCodes.FORBIDDEN, "Admin access required"));
  }
  next();
}
