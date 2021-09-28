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

const buildingsData = [
  {
    building_number: '123',
    building_name: 'Tony Hall',
    address: '123 Main St, Barksdale AFB 71037',
  },
  {
    building_number: '456',
    building_name: 'Ezekiel Hall',
    address: '456 Main St, Barksdale AFB 71037',
  },
];

const roomsData = [

  {
    building_id: 1,
    room_number: '1A',
    status: 1,
  },
  {
    building_id: 1,
    room_number: '1B',
    status: 1,
  },
  {
    building_id: 1,
    room_number: '1C',
    status: 1,
  },
  {
    building_id: 1,
    room_number: '1D',
    status: 0,
  },

  {
    building_id: 1,
    room_number: '2A',
    status: 1,
  },
  {
    building_id: 1,
    room_number: '2B',
    status: 1,
  },
  {
    building_id: 1,
    room_number: '2C',
    status: 1,
  },
  {
    building_id: 1,
    room_number: '2D',
    status: 0,
  },

  {
    building_id: 2,
    room_number: '1A',
    status: 1,
  },
  {
    building_id: 2,
    room_number: '1B',
    status: 1,
  },
  {
    building_id: 2,
    room_number: '1C',
    status: 1,
  },
  {
    building_id: 2,
    room_number: '1D',
    status: 0,
  },

  {
    building_id: 2,
    room_number: '2A',
    status: 1,
  },
  {
    building_id: 2,
    room_number: '2B',
    status: 1,
  },
  {
    building_id: 2,
    room_number: '2C',
    status: 1,
  },
  {
    building_id: 2,
    room_number: '2D',
    status: 0,
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

  // Seed buildings table.
  for (const b of buildingsData) {
    const building = await prisma.buildings.create({
      data: b,
    });
    console.log(`Created building ${building.building_number} with name ${building.building_name}.`);
  }

  // Seed rooms table.
  for (const r of roomsData) {
    const room = await prisma.rooms.create({
      data: r,
    });
    console.log(`Created room ${room.room_number}.`);
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
