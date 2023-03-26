import { RequestHandler, Request, Response, NextFunction } from "express";
import { validationResult, body, CustomValidator } from "express-validator";
import { Request as ValidatorRequest } from "express-validator/src/base";

import { findByName } from "../models/category.model";

const unique = async (
  value: CustomValidator & string,
  req: ValidatorRequest
) => {
  return findByName(value).then((product) => {
    if (product && req?.params?.id != product.id) {
      throw new Error(`Product name ${value} already taken.`);
    }
  });
};

const store: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export default [
  body("name")
    .notEmpty()
    .escape()
    .custom(
      async (value: CustomValidator & string, { req }: ValidatorRequest) => {
        return unique(value, req);
      }
    ),
  store,
];
