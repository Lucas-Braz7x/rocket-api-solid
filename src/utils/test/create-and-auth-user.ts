import { FastifyInstance } from "fastify";
import request from "supertest";

export const createAndAuthUser = async (app: FastifyInstance) => {
  await request(app.server).post("/users").send({
    name: "Lucas",
    email: "teste@gmail.com",
    password: "123456",
  });

  const authResponse = await request(app.server).post("/auth").send({
    email: "teste@gmail.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return { token };
};
