/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const httpStatus = require('http-status');
const { PrismaClient } = require('@prisma/client');
const hashPassword = require('@/utils/hashPassword');
const ApiError = require('@/utils/ApiError');

const prisma = new PrismaClient();

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  return user;
};

/**
* Get user by email
* @param {string} email
* @returns {Promise<User>}
*/
const getPasswordForUser = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  return user.password;
};

/**
* Check a users hashed password with the salt from the env.
* Wrapped in a Promise in order to use async functionality (await).
* @param {string} email
* @returns {boolean}
*/
const checkPassword = async (username, password) => {
  const correct_password = await getPasswordForUser(username);
  return (password === correct_password);
};

/**
 * Check if email is taken. Returns true if taken.
 * @param {ObjectId} email
 * @returns {Promise<User>}
 */
const isUsernameTaken = async (username) => {
  const user = await getUserByUsername(username);
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
  if (await isUsernameTaken(userData.username)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken');
  }
  // Role of new user
  let userRole;
  if (userData.role !== undefined) {
    if (userData.role.toUpperCase === 'ADMIN') {
      userRole = prisma.user.role.ADMIN;
    }
  }

  const data = {
    username: userData.username,
    password: userData.password,
    role: userRole,
    isLocked: false,
  };

  const user = await prisma.user.create({ data });
  return user;
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
  if (updateBody.username && !isUsernameTaken(updateBody.username)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken');
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
      username: updateBody.username,
      role: userRole,
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

const lockUserById = async (userId) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isLocked: true,
    },
  });
};

const unlockUserById = async (userId) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isLocked: false,
    },
  });
};

module.exports = {
  isUsernameTaken,
  checkPassword,
  getUserByUsername,
  createUser,
  queryUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  lockUserById,
  unlockUserById,
};
