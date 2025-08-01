import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middleware/verify-jwt";
import { create } from "./create.controller";
import { validate } from "./validate.controller";
import { history } from "./history.controller";
import { metrics } from "./metrics.controller";
import { verifyUserRole } from "@/http/middleware/verify-user-role";

export const checkInsRouter = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJwt);

  app.get("/check-ins/history", history);
  app.get("/check-ins/metrics", metrics);

  app.post("/gyms/:gymId/check-ins", create);
  app.patch(
    "/check-ins/:checkInId/validate",
    { onRequest: [verifyUserRole("ADMIN")] },
    validate
  );
};
