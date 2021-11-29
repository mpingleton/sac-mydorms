const httpStatus = require('http-status');

const { tokenTypes } = require('@/config/tokens');
const ApiError = require('@/utils/ApiError');
const tokenService = require('./token.service');
const userService = require('./user.service');

/**
 * Login with username and password
 * @param {string} username
 * @param {string} password
 * @returns {User}
 */
const loginUserWithUsernameAndPassword = async (username, password) => {
  const user = await userService.getUserByUsername(username);
  // TODO: Should use bcrypt to compare
  // And fn should probably live elsewhere (idiomatic Prisma?)
  if (!user || !(await user.password === password)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect username or password');
  }
  return user;
};

/**
 * Current user
 * @param {string} accessToken
 * @returns {User}
 */
const me = async (accessToken) => {
  const userId = await tokenService.verifyToken(accessToken, tokenTypes.ACCESS);
  const user = await userService.getUserById(userId);
  if (!user) {
    throw new Error();
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Token}
 */
const logout = async (refreshToken) => {
  await tokenService.deleteToken(refreshToken);
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Object}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user_id);
    if (!user) {
      throw new Error();
    }
    await tokenService.deleteToken(refreshToken);
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

module.exports = {
  loginUserWithUsernameAndPassword,
  me,
  logout,
  refreshAuth,
};
