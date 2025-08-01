import { FastifyInstance } from "fastify";
import { register } from "./register.controller";
import { auth } from "./auth.controller";
import { profile } from "./profile.controller";
import { verifyJwt } from "@/http/middleware/verify-jwt";
import { refresh } from "./refresh.controller";

export const usersRouter = async (app: FastifyInstance) => {
  app.post("/users", register);
  app.post("/auth", auth);

  app.patch("/token/refresh", refresh);

  app.get("/me", { onRequest: [verifyJwt] }, profile);
};
