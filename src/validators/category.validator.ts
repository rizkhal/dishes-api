import { RequestHandler, Request, Response, NextFunction } from "express";
import { validationResult, body, CustomValidator } from "express-validator";

import { findByName } from "../models/category.model";

const store: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};

export const storeValidator = [
  body("name")
    .notEmpty()
    .escape()
    .custom(async (value: CustomValidator & string) => {
      return findByName(value).then((category) => {
        if (category) {
          throw new Error(`Category ${value} already taken.`);
        }
      });
    }),
  store,
];
