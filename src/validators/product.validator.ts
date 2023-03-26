import { PrismaClient } from "@prisma/client";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { body, validationResult, CustomValidator } from "express-validator";
import { Request as ValidatorRequest } from "express-validator/src/base";

import { findByName } from "../models/product.model";

const prisma: PrismaClient = new PrismaClient();

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

const isExists = async (value: number) => {
  const exists = await prisma.category.findFirst({
    where: {
      id: Number(value),
    },
  });

  if (exists) return true;

  throw Error("Category does't exists");
};

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

export default [
  body("name")
    .notEmpty()
    .escape()
    .custom(
      async (value: CustomValidator & string, { req }: ValidatorRequest) => {
        return unique(value, req);
      }
    ),
  body("price").isNumeric().notEmpty(),
  body("category_id")
    .notEmpty()
    .custom(async (value: CustomValidator & number) => {
      return isExists(value);
    }),
  store,
];
