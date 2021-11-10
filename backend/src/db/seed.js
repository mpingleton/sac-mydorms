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
    name: 'Tony',
    email: 'tony.doe@us.af.mil',
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
    building_name: 'Tony Manor',
    address: '123 Main St, Barksdale AFB 71037',
  },
  {
    building_number: '456',
    building_name: 'Ezekiel Manor',
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
    middle_name: 'Randy',
    last_name: 'Doe',
    phone: '123-456-7891',
    email: 'tony.doe.1@us.af.mil',
  },
  {
    rank: 'A1C',
    first_name: 'James',
    middle_name: 'Brad',
    last_name: 'Mosely',
    phone: '123-456-7891',
    email: 'james.mosely.10@us.af.mil',
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

const enrollmentsData = [
  {
    user_id: 4,
    personnel_id: 1,
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

const dormManagerAssignmentsData = [
  {
    personnel_id: 3,
    building_id: 1,
  },
];

const workOrdersData = [
  {
    room_id: 1,
    subject: 'Broken Sink',
    created_by: 3,
    creator_remarks: 'Sink is leaking water into the cabinet below.',
    created_timestamp: '2021-09-20T00:00:00.000Z',
    status: 1,
    status_timestamp: '2021-09-20T00:00:00.000Z',
  },
  {
    room_id: 11,
    subject: 'Broken A/C.',
    created_by: 2,
    creator_remarks: 'Air conditioner is blowing hot air.',
    created_timestamp: '2021-09-20T00:00:00.000Z',
    status: 1,
    status_timestamp: '2021-09-20T00:00:00.000Z',
  },
];

const workOrderCommentsData = [
  {
    work_order_id: 1,
    personnel_id: 3,
    timestamp: '2021-09-20T00:00:00.000Z',
    comment: 'Water damage was found near the sink from leakage.',
  },
  {
    work_order_id: 1,
    personnel_id: 3,
    timestamp: '2021-09-20T00:00:00.000Z',
    comment: 'CE will need to cut out some of the drywall near the sink due to water damage.',
  },
  {
    work_order_id: 2,
    personnel_id: 3,
    timestamp: '2021-09-20T00:00:00.000Z',
    comment: 'Thermostat was found on the heat setting.  Closing work order.',
  },
];

const roomInspectionsData = [
  {
    room_id: 2,
    resident_id: 2,
    dorm_manager_id: 3,
    timestamp: '2021-09-20T00:00:00.000Z',
    inspector_name: 'MSgt Inspector',
    inspector_remarks: 'No discrepancy.',
  },
  {
    room_id: 1,
    resident_id: 1,
    dorm_manager_id: 3,
    timestamp: '2021-10-20T00:00:00.000Z',
    inspector_name: 'MSgt Inspector',
    inspector_remarks: 'Dirty laundry all over the place.',
  },
];

const messagesData = [
  {
    sender_id: 3,
    recipient_id: 1,
    timestamp: '2021-09-20T00:00:00.000Z',
    subject: 'BAH Concerns',
    body: 'Sir,\n\nI need a copy of your LES in order to get your BAH authorization going.',
  },
  {
    sender_id: 3,
    recipient_id: 2,
    timestamp: '2021-09-20T00:00:00.000Z',
    subject: 'A/C Work Order',
    body: 'Sir,\n\nI am currently working on the work order for your air conditioning system.',
  },
  {
    sender_id: 3,
    recipient_id: 2,
    timestamp: '2021-09-20T00:00:00.000Z',
    subject: 'A/C Work Order Progress',
    body: 'Sir,\n\nWe found mold inside the air handler, you may need to change rooms.',
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

  // Seed enrollments data.
  for (const e of enrollmentsData) {
    const enrollment = await prisma.enrollments.create({
      data: e,
    });
    console.log(`Created enrollment of user ${enrollment.user_id} to person ${enrollment.personnel_id}.`);
  }

  // Seed room assignments table.
  for (const ra of roomAssignmentsData) {
    const roomAssignment = await prisma.roomAssignments.create({
      data: ra,
    });
    console.log(`Assigned person id ${roomAssignment.personnel_id} to room id: ${roomAssignment.room_id}.`);
  }

  // Seed dorm manager assignments table.
  for (const da of dormManagerAssignmentsData) {
    const dormManagerAssignment = await prisma.dormManagerAssignments.create({
      data: da,
    });
    console.log(`Assigned person id ${dormManagerAssignment.personnel_id} to be manager of building id ${dormManagerAssignment.building_id}.`);
  }

  // Seed work orders table.
  for (const wo of workOrdersData) {
    const workOrder = await prisma.workOrders.create({
      data: wo,
    });
    console.log(`Work order ${workOrder.creator_remarks} created.`);
  }

  // Seed work order comments table.
  for (const wc of workOrderCommentsData) {
    const workOrderComment = await prisma.workOrderComments.create({
      data: wc,
    });
    console.log(`Created new work order comment: ${workOrderComment.comment}.`);
  }

  // Seed the inspections table.
  for (const insp of roomInspectionsData) {
    const inspection = await prisma.roomInspections.create({ data: insp });
    console.log(`Created room inspection with the following remarks: ${inspection.inspector_remarks}.`);
  }

  // Seed the messages table.
  for (const mess of messagesData) {
    const message = await prisma.messages.create({ data: mess });
    console.log(`Created message from ${message.sender_id} to ${message.recipient_id} with a subject of ${message.subject}: ${message.body}.`);
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
