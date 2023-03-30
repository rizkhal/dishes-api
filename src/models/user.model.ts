import prisma from "../database/client";

export const findUserById = (id: number) => {
  return prisma.user.findFirst({
    where: { id: id },
  });
};
