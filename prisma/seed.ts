import { PrismaClient } from "@prisma/client";
const prisma: PrismaClient = new PrismaClient();

async function main() {
  const category = await prisma.category.createMany({
    data: [{ name: "Desert" }, { name: "Food" }, { name: "Drink" }],
    skipDuplicates: true,
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Americano",
        price: 1000,
        categoryId: 3,
      },
      {
        name: "Capucino",
        price: 1000,
        categoryId: 3,
      },
      {
        name: "Salad",
        price: 1000,
        categoryId: 2,
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
