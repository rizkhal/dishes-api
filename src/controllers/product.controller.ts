import { Request, Response } from "express";
import prisma from "../database/client";

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

  async store(req: Request, res: Response) {
    const { name, price, category_id } = req.body;

    try {
      const product = await prisma.product.create({
        include: {
          category: true,
        },
        data: {
          name: name,
          price: price,
          categoryId: Number(category_id),
        },
      });

      const response = {
        message: "Prodcuct created",
        data: product,
      };

      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({
        message: "Bad Request",
        error: error,
      });
    }
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, price, category_id } = req.body;

    try {
      const product = await prisma.product.update({
        where: { id: Number(id) },
        data: {
          name: name,
          price: price,
          categoryId: Number(category_id),
        },
      });

      return res.status(200).json({
        message: "Prodcuct updated",
        data: product,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Bad Request",
        error: error,
      });
    }
  },

  async destroy(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await prisma.product.delete({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).json({
        message: "Product deleted",
      });
    } catch (error) {
      return res.status(400).json({
        message: "Bad Request",
        error: error,
      });
    }
  },
};
