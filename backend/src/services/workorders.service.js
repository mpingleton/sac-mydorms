const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getWorkOrders = async () => {
  const workOrders = await prisma.workOrders.findMany({});
  return workOrders;
};

const getWorkOrderById = async (workOrderId) => {
  const workOrder = await prisma.workOrders.findUnique({
    where: {
      id: workOrderId,
    },
  });
  return workOrder;
};

const createWorkOrder = async (
  subjectLine,
  roomId,
  createdBy,
  creatorRemarks,
  createdTimestamp,
  status,
  statusTimestamp,
) => {
  const data = {
    subject: subjectLine,
    room_id: roomId,
    created_by: createdBy,
    creator_remarks: creatorRemarks,
    created_timestamp: createdTimestamp,
    status: 0,
    status_timestamp: statusTimestamp,
  };

  await prisma.workOrders.create({ data });
};

const getAllWorkOrderComments = async () => {
  const comments = await prisma.workOrderComments.findMany({});
  return comments;
};

const getWorkOrderCommentById = async (commentId) => {
  const comment = await prisma.workOrderComments.findUnique({
    where: {
      id: commentId,
    },
  });
  return comment;
};

const createWorkOrderComment = async (
  workOrderId,
  personnelId,
  commentTimestamp,
  commentString,
) => {
  const data = {
    work_order_id: workOrderId,
    personnel_id: personnelId,
    timestamp: commentTimestamp,
    comment: commentString,
  };

  await prisma.workOrderComments.create({ data });
};

const getAllCommentsForWorkOrder = async (workOrderId) => {
  const comments = await prisma.workOrderComments.findMany({
    where: {
      work_order_id: workOrderId,
    },
  });
  return comments;
};

module.exports = {
  getWorkOrders,
  getWorkOrderById,
  createWorkOrder,
  getAllWorkOrderComments,
  getWorkOrderCommentById,
  createWorkOrderComment,
  getAllCommentsForWorkOrder,
};