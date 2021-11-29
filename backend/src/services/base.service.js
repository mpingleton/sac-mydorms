const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getBases = async () => {
  const bases = await prisma.bases.findMany({});
  return bases;
};

const getBuildingsByBase = async (baseId) => {
  const buildings = await prisma.buildings.findMany({
    where: {
      base_id: baseId,
    },
  });

  return buildings;
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
  getBuildingsByBase,
  getBaseById,
  createBase,
};
