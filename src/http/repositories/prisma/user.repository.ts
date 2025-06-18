import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { BaseUserRepository } from "./dto/user.repository";

export class UserRepository implements BaseUserRepository {
  constructor() {}

  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
