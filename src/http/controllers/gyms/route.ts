import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middleware/verify-jwt";

export const gymsRouter = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJwt);
};
