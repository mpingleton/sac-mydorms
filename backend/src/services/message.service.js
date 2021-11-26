const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getMessagesByRecipientId = async (recipientId) => {
  const messages = await prisma.messages.findMany({
    where: {
      recipient_id: recipientId,
    },
  });

  return messages;
};

const getMessageById = async (id) => {
  const message = await prisma.messages.findUnique({
    where: {
      id,
    },
  });

  return message;
};

const sendMessage = async (timestamp, senderId, recipientId, subject, body) => {
  const data = {
    timestamp,
    sender_id: senderId,
    recipient_id: recipientId,
    subject,
    body,
  };

  await prisma.messages.create({ data });
};

module.exports = {
  getMessagesByRecipientId,
  getMessageById,
  sendMessage,
};
