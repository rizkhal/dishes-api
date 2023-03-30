import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

export const findByName = async (value: string) => {
  return prisma.product.findFirst({
    where: { name: value },
  });
};
