const prisma = require("../config/db");

const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  isBanned: true,
  createdAt: true,
  updatedAt: true,
};

const createUser = (name, email, password, role = "JOB_SEEKER") =>
  prisma.user.create({
    data: { name, email, password, role },
    select: publicUserSelect,
  });

const findUserByEmail = (email) =>
  prisma.user.findUnique({
    where: { email },
  });

const findUserById = (id) =>
  prisma.user.findUnique({
    where: { id: Number(id) },
    select: publicUserSelect,
  });

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};