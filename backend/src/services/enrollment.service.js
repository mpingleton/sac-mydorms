const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getEnrollments = async () => {
  const enrollments = await prisma.enrollments.findMany({});
  return enrollments;
};

const getEnrollmentByUserId = async (userId) => {
  const enrollments = await prisma.enrollments.findMany({
    where: {
      user_id: userId,
    },
  });

  let result = null;
  if (enrollments.length === 1) {
    const firstIndex = 0;
    result = enrollments[firstIndex];
  }

  return result;
};

const createEnrollment = async (
  userId,
  personnelId,
) => {
  const data = {
    user_id: userId,
    personnel_id: personnelId,
  };

  await prisma.enrollments.create({ data });
};

module.exports = {
  getEnrollments,
  getEnrollmentByUserId,
  createEnrollment,
};
