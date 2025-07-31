import { FastifyInstance } from "fastify";
import { register } from "../controllers/register.controller";
import { auth } from "../controllers/auth.controller";
import { profile } from "../controllers/profile.controller";
import { verifyJwt } from "../middleware/verify-jwt";

export const appRouter = async (app: FastifyInstance) => {
  app.post("/users", register);
  app.post("/auth", auth);

  app.get("/me", { onRequest: [verifyJwt] }, profile);
};
