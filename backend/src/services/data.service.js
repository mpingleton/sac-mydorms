const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getPersonnel = async () => {
  const personnel = prisma.personnel.findMany({});

  return personnel;
};

module.exports = {
  getPersonnel,
};
