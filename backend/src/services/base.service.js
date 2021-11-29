const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getBases = async () => {
  const bases = await prisma.bases.findMany({});
  return bases;
};

const getBaseById = async (baseId) => {
  const bases = await prisma.bases.findUnique({
    where: {
      id: baseId,
    },
  });

  return bases;
};

module.exports = {
  getBases,
  getBaseById,
};
