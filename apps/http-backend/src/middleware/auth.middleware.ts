import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../config";
import { RequestHandler } from "express";

export const authenticateUser: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      throw new Error("Invalid token.");
    }
    const decodedToken = jwt.verify(token as string, env.JWT_SECRET);

    const userId = (decodedToken as JwtPayload).userId;

    req.userId = userId;

    next();
  } catch (error) {
    res.status(403).json({
      message: error instanceof Error ? error.message : "Unauthorized.",
    });
  }
};
