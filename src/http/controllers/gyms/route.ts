import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middleware/verify-jwt";
import { create } from "./create.controller";
import { search } from "./search.controller";
import { nearby } from "./nearby.controller";
import { verifyUserRole } from "@/http/middleware/verify-user-role";

export const gymsRouter = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJwt);

  app.get("/gyms/search", search);
  app.get("/gyms/nearby", nearby);

  app.post("/gyms", { onRequest: [verifyUserRole("ADMIN")] }, create);
};
