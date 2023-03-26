import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

export default {
  async index(req: Request, res: Response) {
    try {
      const { category, product } = req.query;

      const filters = {};

      if (category) {
        Object.assign(filters, {
          category: {
            id: Number(category),
          },
        });
      }

      if (product) {
        Object.assign(filters, {
          product: {
            id: Number(product),
          },
        });
      }

      const query = await prisma.product.findMany({
        include: {
          category: true,
        },
        where: filters,
      });

      return res.status(200).json({
        data: query,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Bad Request",
        error: error,
      });
    }
  },
};
