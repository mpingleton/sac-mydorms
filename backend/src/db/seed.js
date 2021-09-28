/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const userData = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    password: '123',
    isEmailVerified: false,
    role: 'ADMIN',
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    password: '123',
    isEmailVerified: false,
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    password: '123',
    isEmailVerified: false,
  },
  {
    name: 'Mike',
    email: 'mike@prisma.io',
    password: 'test1234',
    isEmailVerified: false,
  },
];

async function main() {
  console.log('Start seeding ...');

  // Seed users table.
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user ${user.name} with id: ${user.id}.`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
