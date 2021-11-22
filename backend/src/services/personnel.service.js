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

const createPersonnel = async (
  baseId,
  rank,
  firstName,
  middleName,
  lastName,
  phoneNumber,
  emailAddress,
  isDormManager,
) => {
  await prisma.personnel.create({
    data: {
      base_id: baseId,
      rank,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      phone: phoneNumber,
      email: emailAddress,
      is_dorm_manager: isDormManager,
    },
  });
};

module.exports = {
  getPersonnel,
  getPersonnelById,
  createPersonnel,
};
