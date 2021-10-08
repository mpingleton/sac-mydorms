const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getPersonnel = async () => {
  const personnel = await prisma.personnel.findMany({});
  return personnel;
};

const getPersonnelById = async (personId) => {
  const person = await prisma.personnel.findUnique({
    where: {
      id: personId,
    },
  });
  return person;
};

const createPersonnel = async (data) => {
  await prisma.personnel.create({ data });
};

module.exports = {
  getPersonnel,
  getPersonnelById,
  createPersonnel,
};
