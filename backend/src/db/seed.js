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

const personnelData = [
  {
    rank: 'AB',
    first_name: 'Tony',
    middle_name: 'Tony',
    last_name: 'Tony',
    phone: '123-456-7891',
    email: 'tony.tony.1@us.af.mil',
  },
  {
    rank: 'A1C',
    first_name: 'Ezekiel',
    middle_name: 'Ezekiel',
    last_name: 'Ezekiel',
    phone: '123-456-7891',
    email: 'ezekiel.ezekiel.10@us.af.mil',
  },
  {
    rank: 'SSgt',
    first_name: 'John',
    middle_name: 'Daniel',
    last_name: 'Snuffy',
    phone: '123-456-7891',
    email: 'john.snuffy@us.af.mil',
  },
];

const roomAssignmentsData = [
  {
    personnel_id: 1,
    room_id: 1,
  },
  {
    personnel_id: 2,
    room_id: 11,
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

  // Seed personnel table.
  for (const p of personnelData) {
    const person = await prisma.personnel.create({
      data: p,
    });
    console.log(`Created person ${person.rank} ${person.first_name} ${person.middle_name} ${person.last_name}.`);
  }

  // Seed room assignments table.
  for (const ra of roomAssignmentsData) {
    const roomAssignment = await prisma.roomAssignments.create({
      data: ra,
    });
    console.log(`Assigned person id ${roomAssignment.personnel_id} to room id: ${roomAssignment.room_id}.`);
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
