const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getPersonnel = async () => {
  const personnel = await prisma.personnel.findMany({});
  return personnel;
};

module.exports = {
  getPersonnel,
};
