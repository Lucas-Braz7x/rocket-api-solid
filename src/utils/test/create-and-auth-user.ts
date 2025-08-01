import { prisma } from "@/lib/prisma";
import { ROLE } from "@prisma/client";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export const createAndAuthUser = async (
  app: FastifyInstance,
  role: ROLE = "MEMBER"
) => {
  await prisma.user.create({
    data: {
      name: "Lucas",
      email: "teste@gmail.com",
      password_hash: await hash("123456", 6),
      role,
    },
  });

  const authResponse = await request(app.server).post("/auth").send({
    email: "teste@gmail.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return { token };
};
