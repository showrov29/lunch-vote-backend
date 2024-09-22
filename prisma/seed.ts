import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create restaurants
  const restaurant1 = await prisma.restaurant.create({
    data: {
      name: 'Pizza Palace',
      packs: {
        create: [{ name: 'Pizza Pack 1' }, { name: 'Pizza Pack 2' }],
      },
    },
  });

  const restaurant2 = await prisma.restaurant.create({
    data: {
      name: 'Burger Haven',
      packs: {
        create: [{ name: 'Burger Pack 1' }, { name: 'Burger Pack 2' }],
      },
    },
  });

  const restaurant3 = await prisma.restaurant.create({
    data: {
      name: 'Sushi Spot',
      packs: {
        create: [{ name: 'Sushi Pack 1' }, { name: 'Sushi Pack 2' }],
      },
    },
  });

  // Create votes for food packs
  await prisma.vote.createMany({
    data: [
      { employee: 'John Doe', foodPackId: 1 },
      { employee: 'Jane Doe', foodPackId: 2 },
      { employee: 'Bob Smith', foodPackId: 3 },
      { employee: 'Alice Johnson', foodPackId: 4 },
      { employee: 'Charlie Brown', foodPackId: 5 },
      { employee: 'David Lee', foodPackId: 6 },
      { employee: 'Eva Green', foodPackId: 1 },
      { employee: 'Fred Taylor', foodPackId: 2 },
      { employee: 'Grace Miller', foodPackId: 3 },
      { employee: 'Henry King', foodPackId: 4 },
    ],
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
