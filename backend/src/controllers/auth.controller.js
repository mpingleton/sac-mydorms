const { ExtractJwt } = require('passport-jwt');
const httpStatus = require('http-status');
const omit = require('lodash/omit');

const enrollmentService = require('@/services/enrollment.service');

const catchAsync = require('@/utils/catchAsync');
const {
  authService, userService, tokenService,
} = require('@/services');

const register = catchAsync(async (req, res) => {
  // Check req.body.code for a registration code.
  // Ensure that pending enrollment exists.
  const pendingEnrollment = await enrollmentService.getPendingEnrollmentByCode(req.body.code);
  if (pendingEnrollment === null) {
    res.send(400, 'The registration code provided is invalid.');
  } else {
    const user = await userService.createUser(req.body);
    // Create the enrollment and delete the pending code.
    await enrollmentService.deletePendingEnrollment(pendingEnrollment.id);
    await enrollmentService.createEnrollment(user.id, pendingEnrollment.personnel_id);
    // const tokens = await tokenService.generateAuthTokens(user);
    // res.status(httpStatus.CREATED).send({ user, tokens });
    res.send(httpStatus.CREATED);
  }
});

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await authService.loginUserWithUsernameAndPassword(username, password);
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
