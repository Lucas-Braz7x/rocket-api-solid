import fastify from "fastify";
import { ZodError } from "zod";
import FastifySwagger from "@fastify/swagger";
import FastifySwaggerUI from "@fastify/swagger-ui";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { usersRouter } from "./http/controllers/users/routes";
import { gymsRouter } from "./http/controllers/gyms/route";
import { checkInsRouter } from "./http/controllers/check-ins/routes";

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

app.register(fastifyCookie);
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(usersRouter);
app.register(gymsRouter);
app.register(checkInsRouter);

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
