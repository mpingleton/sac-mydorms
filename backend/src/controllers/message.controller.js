const { ExtractJwt } = require('passport-jwt');

const { authService } = require('@/services');
const messageService = require('@/services/message.service');
const personnelService = require('@/services/personnel.service');
const enrollmentService = require('@/services/enrollment.service');

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

const getMyMessages = async (req, res) => {
  const user = await authService.me(ExtractJwt.fromAuthHeaderAsBearerToken()(req));
  const enrollment = await enrollmentService.getEnrollmentByUserId(user.id);
  const messages = await messageService.getMessagesByRecipientId(enrollment.personnel_id);

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

const getMessageById = async (req, res) => {
  const message = await messageService.getMessageById(parseInt(req.params.id, 10));

  const messagePromises = [];
  messagePromises.push(personnelService.getPersonnelById(message.sender_id)
    .then((personnelObject) => {
      message.senderObject = personnelObject;
    }));
  messagePromises.push(personnelService.getPersonnelById(message.recipient_id)
    .then((personnelObject) => {
      message.recipientObject = personnelObject;
    }));
  await Promise.all(messagePromises);

  res.send(200, message);
};

const sendMessage = async (req, res) => {
  const user = await authService.me(ExtractJwt.fromAuthHeaderAsBearerToken()(req));

  const enrollment = await enrollmentService.getEnrollmentByUserId(user.id);
  await messageService.sendMessage(
    new Date().toISOString(),
    enrollment.personnel_id,
    req.body.recipient_id,
    req.body.subject,
    req.body.body,
  );

  res.send(200);
};

module.exports = {
  getMessages,
  getMyMessages,
  getMessageById,
  sendMessage,
};
