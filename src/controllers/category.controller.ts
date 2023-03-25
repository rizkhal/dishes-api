import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

export default {
  async index(req: Request, res: Response) {
    const query = await prisma.category.findMany();

    res.status(200).json({
      data: query,
    });
  },

  async store(req: Request, res: Response) {
    try {
      const category = await prisma.category.create({
        data: {
          name: req.body.name,
        },
      });

      res.status(200).json({
        message: "Success add category",
        data: category,
      });
    } catch (error) {
      res.status(400).json({
        message: "Failed to add category",
        error: error,
      });
    }
  },
};
