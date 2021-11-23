/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const users = [
  {
    email: 'alice@prisma.io',
    password: '123',
    role: 'USER',
    name: 'Alice',
    isEmailVerified: false,
  },
  {
    email: 'mahmoud@prisma.io',
    password: '123',
    role: 'USER',
    name: 'Mahmoud',
    isEmailVerified: false,
  },
  {
    email: 'ezekiel@prisma.io',
    password: '123',
    role: 'USER',
    name: 'Ezekiel',
    isEmailVerified: false,
  },
  {
    email: 'john.snuffy@mydorms.com',
    password: '12345',
    role: 'USER',
    name: 'John',
    isEmailVerified: false,
  },
];

const bases = [
  {
    name: 'Whiteman AFB',
  },
  {
    name: 'Barksdale AFB',
  },
  {
    name: 'Minot AFB',
  },
  {
    name: 'Malstrom AFB',
  },
];

const personnel = [
  {
    base_id: 1,
    rank: 'SrA',
    first_name: 'Tony',
    middle_name: 'Man',
    last_name: 'Doe',
    phone: '123-456-7890',
    email: 'tony@prisma.io',
    is_dorm_manager: false,
  },
  {
    base_id: 1,
    rank: 'A1C',
    first_name: 'Alice',
    middle_name: 'Emma',
    last_name: 'Doe',
    phone: '123-456-7890',
    email: 'alice@prisma.io',
    is_dorm_manager: false,
  },
  {
    base_id: 1,
    rank: 'AB',
    first_name: 'Ezekiel',
    middle_name: 'Tyler',
    last_name: 'Gary',
    phone: '123-456-7890',
    email: 'ezekiel@prisma.io',
    is_dorm_manager: false,
  },
  {
    base_id: 1,
    rank: 'SSgt',
    first_name: 'John',
    middle_name: 'Tyler',
    last_name: 'Snuffy',
    phone: '123-456-7890',
    email: 'john.snuffy@mydorms.com',
    is_dorm_manager: true,
  },
];

const enrollments = [
  {
    user_id: 4,
    personnel_id: 4,
  },
  {
    user_id: 3,
    personnel_id: 3,
  },
  {
    user_id: 1,
    personnel_id: 2,
  },
];

const pendingEnrollments = [
  {
    personnel_id: 1,
    registration_code: '8KDM33JMKD',
  },
];

const buildings = [
  {
    base_id: 1,
    building_number: '120',
    building_name: 'Columbia Hall',
    address: '120 Main St',
  },
  {
    base_id: 1,
    building_number: '121',
    building_name: 'Discovery Hall',
    address: '121 Main St',
  },
  {
    base_id: 2,
    building_number: '222',
    building_name: 'Tony Hall',
    address: '222 Main St',
  },
  {
    base_id: 2,
    building_number: '223',
    building_name: 'Ezekiel Hall',
    address: '223 Main St',
  },
  {
    base_id: 3,
    building_number: '666',
    building_name: 'Smith Manor',
    address: '666 Triangle St',
  },
  {
    base_id: 3,
    building_number: '667',
    building_name: 'Holbrook Manor',
    address: '667 Triangle St',
  },
  {
    base_id: 4,
    building_number: '111',
    building_name: 'Jane Hall',
    address: '111 Main St',
  },
  {
    base_id: 4,
    building_number: '112',
    building_name: 'John Hall',
    address: '112 Main St',
  },
];

const rooms = [
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
    room_number: '2A',
    status: 0,
  },
  {
    building_id: 1,
    room_number: '2B',
    status: 1,
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
    room_number: '2A',
    status: 0,
  },
  {
    building_id: 2,
    room_number: '2B',
    status: 1,
  },
  {
    building_id: 3,
    room_number: '1A',
    status: 1,
  },
  {
    building_id: 3,
    room_number: '1B',
    status: 1,
  },
  {
    building_id: 3,
    room_number: '2A',
    status: 0,
  },
  {
    building_id: 3,
    room_number: '2B',
    status: 1,
  },
  {
    building_id: 4,
    room_number: '1A',
    status: 1,
  },
  {
    building_id: 4,
    room_number: '1B',
    status: 1,
  },
  {
    building_id: 4,
    room_number: '2A',
    status: 0,
  },
  {
    building_id: 4,
    room_number: '2B',
    status: 1,
  },
  {
    building_id: 5,
    room_number: '1A',
    status: 1,
  },
  {
    building_id: 5,
    room_number: '1B',
    status: 1,
  },
  {
    building_id: 5,
    room_number: '2A',
    status: 0,
  },
  {
    building_id: 5,
    room_number: '2B',
    status: 1,
  },
  {
    building_id: 6,
    room_number: '1A',
    status: 1,
  },
  {
    building_id: 6,
    room_number: '1B',
    status: 1,
  },
  {
    building_id: 6,
    room_number: '2A',
    status: 0,
  },
  {
    building_id: 6,
    room_number: '2B',
    status: 1,
  },
  {
    building_id: 7,
    room_number: '1A',
    status: 1,
  },
  {
    building_id: 7,
    room_number: '1B',
    status: 1,
  },
  {
    building_id: 7,
    room_number: '2A',
    status: 0,
  },
  {
    building_id: 7,
    room_number: '2B',
    status: 1,
  },
  {
    building_id: 8,
    room_number: '1A',
    status: 1,
  },
  {
    building_id: 8,
    room_number: '1B',
    status: 1,
  },
  {
    building_id: 8,
    room_number: '2A',
    status: 0,
  },
  {
    building_id: 8,
    room_number: '2B',
    status: 1,
  },
];

const roomAssignments = [
  {
    personnel_id: 2,
    room_id: 1,
  },
];

const workOrders = [
  {
    room_id: 1,
    subject: 'A/C is broken',
    creator_remarks: 'A/C is blowing hot air.',
    created_by: 1,
    created_timestamp: new Date().toISOString(),
    status: 1,
    status_timestamp: new Date().toISOString(),
  },
  {
    room_id: 1,
    subject: 'Sink Leaking',
    creator_remarks: 'Sink wont stop leaking.',
    created_by: 1,
    created_timestamp: new Date().toISOString(),
    status: 1,
    status_timestamp: new Date().toISOString(),
  },
];

const workOrderComments = [];

const roomInspections = [
  {
    room_id: 1,
    resident_id: 1,
    dorm_manager_id: 3,
    timestamp: new Date().toISOString(),
    inspector_name: 'SSgt Jane Doe',
    inspector_remarks: 'No discrepancy.',
  },
];

const events = [
  {
    base_id: 1,
    created_by: 1,
    scheduled: new Date().toISOString(),
    location: 'Fitness Center',
    subject: 'Jiu Jit Tsu Practice',
    description: 'Hello all!\n\nWe are holding a Jiu Jit Tsu get together!  Please come and join us if you can.',
  },
];

const eventResponses = [];

const commonAreaPosts = [
  {
    base_id: 1,
    posted_by: 4,
    timestamp: new Date().toISOString(),
    text: 'Hello world! This is an example of a common area post.',
    comments_enabled: true,
  },
];

const commonAreaPostComments = [];

const messages = [];

async function main() {
  console.log('Start seeding...');

  for (const user of users) {
    const newUser = await prisma.user.create({ data: user });
    console.log(`New user: ${JSON.stringify(newUser)}.`);
  }

  for (const base of bases) {
    const newBase = await prisma.bases.create({ data: base });
    console.log(`New base: ${JSON.stringify(newBase)}.`);
  }

  for (const person of personnel) {
    const newPerson = await prisma.personnel.create({ data: person });
    console.log(`New person: ${JSON.stringify(newPerson)}.`);
  }

  for (const enrollment of enrollments) {
    const newEnrollment = await prisma.enrollments.create({ data: enrollment });
    console.log(`New enrollment: ${JSON.stringify(newEnrollment)}.`);
  }

  for (const pendingEnrollment of pendingEnrollments) {
    const newPendingEnrollment = await prisma.pendingEnrollments.create(
      { data: pendingEnrollment },
    );
    console.log(`New pending enrollment: ${JSON.stringify(newPendingEnrollment)}.`);
  }

  for (const building of buildings) {
    const newBuilding = await prisma.buildings.create({ data: building });
    console.log(`New building: ${JSON.stringify(newBuilding)}.`);
  }

  for (const room of rooms) {
    const newRoom = await prisma.rooms.create({ data: room });
    console.log(`New room: ${JSON.stringify(newRoom)}.`);
  }

  for (const roomAssignment of roomAssignments) {
    const newRoomAssignment = await prisma.roomAssignments.create({ data: roomAssignment });
    console.log(`New room assignment: ${JSON.stringify(newRoomAssignment)}.`);
  }

  for (const workOrder of workOrders) {
    const newWorkOrder = await prisma.workOrders.create({ data: workOrder });
    console.log(`New work order: ${JSON.stringify(newWorkOrder)}.`);
  }

  for (const workOrderComment of workOrderComments) {
    const newWorkOrderComment = await prisma.workOrderComments.create({ data: workOrderComment });
    console.log(`New work order comment: ${JSON.stringify(newWorkOrderComment)}.`);
  }

  for (const roomInspection of roomInspections) {
    const newRoomInspection = await prisma.roomInspections.create({ data: roomInspection });
    console.log(`New room inspection: ${JSON.stringify(newRoomInspection)}.`);
  }

  for (const evnt of events) {
    const newEvent = await prisma.events.create({ data: evnt });
    console.log(`New event: ${JSON.stringify(newEvent)}.`);
  }

  for (const eventResponse of eventResponses) {
    const newEventResponse = await prisma.eventResponses.create({ data: eventResponse });
    console.log(`New event response: ${JSON.stringify(newEventResponse)}.`);
  }

  for (const commonAreaPost of commonAreaPosts) {
    const newCommonAreaPost = await prisma.commonAreaPosts.create({ data: commonAreaPost });
    console.log(`New common area post: ${JSON.stringify(newCommonAreaPost)}.`);
  }

  for (const commonAreaPostComment of commonAreaPostComments) {
    const newCommonAreaPostComment = await prisma.commonAreaPostComments.create({
      data: commonAreaPostComment,
    });
    console.log(`New common area post comment: ${JSON.stringify(newCommonAreaPostComment)}.`);
  }

  for (const message of messages) {
    const newMessage = await prisma.messages.create({ data: message });
    console.log(`New message: ${newMessage}.`);
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
