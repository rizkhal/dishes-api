import prisma from "../database/client";
import { NextFunction, Request, Response } from "express";
import Joi, { CustomHelpers, ValidationError } from "joi";

const unique = async (value: string, { error }: CustomHelpers) => {
  const category = await prisma.category.findFirst({ where: { name: value } });

  if (category) {
    return error(`"${value}" is already taken.`);
  }
};

const schema = Joi.object({
  name: Joi.string().external(unique).required(),
});

export default {
  async validate(req: Request, res: Response, next: NextFunction) {
    schema
      .validateAsync(req.body)
      .then(() => next())
      .catch((error: ValidationError) => {
        res.status(422).json({
          message: "Unprocessable Content",
          errors: error.details,
        });
      });
  },
};
