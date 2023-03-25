import { Request, Response, NextFunction } from "express";

/* eslint-disable no-unused-vars */
export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}
