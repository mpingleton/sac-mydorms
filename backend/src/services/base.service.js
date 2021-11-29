const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getBases = async () => {
  const bases = await prisma.bases.findMany({});
  return bases;
};

const getBaseById = async (baseId) => {
  const base = await prisma.bases.findUnique({
    where: {
      id: baseId,
    },
  });

  return base;
};

const createBase = async (
  baseName,
) => {
  await prisma.bases.create({
    data: {
      name: baseName,
    },
  });
};

module.exports = {
  getBases,
  getBaseById,
  createBase,
};
