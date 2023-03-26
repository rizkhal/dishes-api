import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

export default {
  async index(req: Request, res: Response) {
    try {
      const query = await prisma.category.findMany();

      res.status(200).json({
        data: query,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }
  },

  async store(req: Request, res: Response) {
    try {
      const category = await prisma.category.create({
        data: {
          name: req.body.name,
        },
      });

      return res.status(200).json({
        message: "Category created",
        data: category,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Bad Request",
        error: error,
      });
    }
  },
};
