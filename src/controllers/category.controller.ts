import { Request, Response } from "express";
import prisma from "../database/client";

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

  async update(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const category = await prisma.category.update({
        where: { id: Number(id) },
        data: {
          name: req.body.name,
        },
      });

      return res.status(200).json({
        message: "Category updated",
        data: category,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }
  },

  async destroy(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const deleteProduct = prisma.product.deleteMany({
        where: {
          categoryId: Number(id),
        },
      });

      const deleteCategory = prisma.category.delete({
        where: { id: Number(id) },
      });

      await prisma.$transaction([deleteProduct, deleteCategory]);

      return res.status(200).json({
        message: "Category deleted",
      });
    } catch (error) {
      return res.status(400).json({
        message: "Bad Request",
        error: error,
      });
    }
  },
};
