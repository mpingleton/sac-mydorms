const httpStatus = require('http-status');
const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (userEmail) => {
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
  return user;
};

/**
 * Check if email is taken. Returns true if taken.
 * @param {ObjectId} email
 * @returns {Promise<User>}
 */
const isEmailTaken = async (email) => {
  const user = await getUserByEmail(email);
  if (!user) {
    return false;
  }
  return true;
};

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userData) => {
  if (await isEmailTaken(userData.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  // Role of new user
  let userRole;
  if (userData.role.toUpperCase === 'ADMIN') {
    userRole = prisma.user.role.ADMIN;
  }

  const data = {
    email: userData.email,
    name: userData.name,
    // bcrypt this
    password: userData.password,
    role: userRole,
    isEmailVerified: false,
  };
  // console.dir(userData);

  await prisma.user.create({ data });
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = prisma.user.findMany({
    where: {
      ...filter,
    },
    orderBy: {
      ...options,
    },
  });

  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId, 10),
    },
  });
  return user;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = getUserById(userId);
  // Check for existing user
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  // Check for existing email
  if (updateBody.email && !isEmailTaken(updateBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  // Role of new user
  let userRole;
  if (updateBody.role.toUpperCase === 'ADMIN') {
    userRole = prisma.user.role.ADMIN;
  }

  const updateUser = await prisma.user.update({
    where: {
      id: parseInt(userId, 10),
    },
    // Could potentially use a Data Transfer Object (DTO) here, but unsure right now.
    data: {
      email: updateBody.email,
      role: userRole,
      name: updateBody.name,
    },
  });

  return updateUser;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const deleteUser = await prisma.user.delete({
    where: {
      id: parseInt(userId, 10),
    },
  });
  return deleteUser;
};

module.exports = {
  isEmailTaken,
  getUserByEmail,
  createUser,
  queryUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
