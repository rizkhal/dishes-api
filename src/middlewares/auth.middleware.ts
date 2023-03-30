import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ");

  if (!token) {
    return res.status(403).json({
      message: "Authorization token is required for authentication",
    });
  }

  try {
    const decoded = jwt.verify(token[1], process.env.TOKEN_KEY || "");
    console.log(decoded);
  } catch (err) {
    return res.status(401).json({
      message: "Authorization token is invalid",
    });
  }

  next();
};
