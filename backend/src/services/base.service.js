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

const createBuilding = async (
  baseId,
  buildingNumber,
  buildingName,
  address,
) => {
  await prisma.buildings.create({
    data: {
      base_id: baseId,
      building_number: buildingNumber,
      building_name: buildingName,
      address,
    },
  });
};

module.exports = {
  getBases,
  getBuildingsByBase,
  getBaseById,
  createBase,
  createBuilding,
};
