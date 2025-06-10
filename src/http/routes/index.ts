import { FastifyInstance } from "fastify";
import { register } from "../controllers/register.controller";

export const appRouter = async (app: FastifyInstance) => {
  app.post("/users", register);
};
