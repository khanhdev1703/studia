// modules/auth/auth.repository.js

import { prisma } from "../../config/database.js";

const authRepository = {
  findUserByEmail(email) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  },

  findUserById(id) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  },

  createUser(data) {
    return prisma.user.create({
      data,
    });
  },
};

export default authRepository;