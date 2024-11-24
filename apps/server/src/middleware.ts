import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET as string;

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.user = null;
    return next();
  }

  const token = authHeader.split(" ")[1] ?? "";

  try {
    const decoded = jwt.verify(token, SUPABASE_JWT_SECRET) as { sub: string };
    req.user = { id: decoded.sub };
    next();
  } catch (error) {
    console.error("Invalid JWT:", error);
    req.user = null;
    next();
  }
};
