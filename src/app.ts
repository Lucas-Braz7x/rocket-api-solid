import fastify from "fastify";
import { ZodError } from "zod";
import FastifySwagger from "@fastify/swagger";
import FastifySwaggerUI from "@fastify/swagger-ui";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { usersRouter } from "./http/controllers/users/routes";
import { gymsRouter } from "./http/controllers/gyms/route";

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

app.register(usersRouter);
app.register(gymsRouter);

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
