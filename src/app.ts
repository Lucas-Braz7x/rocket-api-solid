import fastify from "fastify";
import { z, ZodError } from "zod";
import { prisma } from "./lib/prisma";
import { register } from "./http/controllers/register.controller";
import { appRouter } from "./http/routes";
import FastifySwagger from "@fastify/swagger";
import FastifySwaggerUI from "@fastify/swagger-ui";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";

export const app = fastify();

app.register(FastifySwagger, {
  swagger: {
    info: {
      title: "Rocket SOLID Gym API",
      description: "API de academias estilo Gympass",
      version: "1.0.0",
    },
    externalDocs: {
      url: "https://github.com/Lucas-Braz7x/rocket-api-solid",
      description: "Repositório no GitHub",
    },
    host: "localhost:3000,",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
      { name: "users", description: "Operações com usuários" },
      { name: "gyms", description: "Operações com academias" },
    ],
  },
});

app.register(FastifySwaggerUI, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "list",
    deepLinking: true,
    displayOperationId: false,
    defaultModelsExpandDepth: 1,
  },
  staticCSP: true,
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

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
