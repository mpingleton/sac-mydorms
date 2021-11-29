const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    username: Joi.string().min(3).max(60),
    password: Joi.string().required().custom(password),
    code: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    username: Joi.string().min(3).max(60),
    password: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
};
