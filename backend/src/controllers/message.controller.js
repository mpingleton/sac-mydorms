const { ExtractJwt } = require('passport-jwt');

const { authService } = require('@/services');
const messageService = require('@/services/message.service');

const getMessages = async (req, res) => {
  const messages = await messageService.getMessages();
  res.send(200, messages);
};

const sendMessage = async (req, res) => {
  const user = await authService.me(ExtractJwt.fromAuthHeaderAsBearerToken()(req));

  await messageService.sendMessage(
    new Date().toISOString(),
    user.id,
    req.body.recipient_id,
    req.body.subject,
    req.body.body,
  );

  res.send(200);
};

module.exports = {
  getMessages,
  sendMessage,
};
