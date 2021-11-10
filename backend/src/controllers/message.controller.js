const { ExtractJwt } = require('passport-jwt');

const { authService } = require('@/services');
const messageService = require('@/services/message.service');
const personnelService = require('@/services/personnel.service');

const getMessages = async (req, res) => {
  const messages = await messageService.getMessages();

  const messagePromises = [];
  for (let i = 0; i < messages.length; i += 1) {
    messagePromises.push(personnelService.getPersonnelById(messages[i].sender_id)
      .then((personnelObject) => {
        messages[i].senderObject = personnelObject;
      }));
    messagePromises.push(personnelService.getPersonnelById(messages[i].recipient_id)
      .then((personnelObject) => {
        messages[i].recipientObject = personnelObject;
      }));
  }
  await Promise.all(messagePromises);

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
