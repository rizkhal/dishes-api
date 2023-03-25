import { PrismaClient } from "@prisma/client";
const prisma: PrismaClient = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [{ name: "Desert" }, { name: "Food" }, { name: "Drink" }],
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
