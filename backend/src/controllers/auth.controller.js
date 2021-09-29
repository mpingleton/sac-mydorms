const { ExtractJwt } = require('passport-jwt');
const httpStatus = require('http-status');
const omit = require('lodash/omit');

const catchAsync = require('@/utils/catchAsync');
const {
  authService, userService, tokenService,
} = require('@/services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const me = catchAsync(async (req, res) => {
  const user = await authService.me(ExtractJwt.fromAuthHeaderAsBearerToken()(req));
  res.send({ user: omit(user, ['password', 'iat']) });
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  const user = await authService.me(tokens.access.token);
  res.send({ user: omit(user, ['password', 'iat']), tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  me,
  refreshTokens,
  logout,
};
