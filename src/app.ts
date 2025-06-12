import fastify from "fastify";
import { z, ZodError } from "zod";
import { prisma } from "./lib/prisma";
import { register } from "./http/controllers/register.controller";
import { appRouter } from "./http/routes";
import { env } from "./env";

export const app = fastify();

app.register(appRouter);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error",
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return reply.status(500).send({ message: "Internal server error" });
});
