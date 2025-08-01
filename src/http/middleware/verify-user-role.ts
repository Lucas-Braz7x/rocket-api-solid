import { ROLE } from "@prisma/client";
import type { FastifyRequest, FastifyReply } from "fastify";

export const verifyUserRole = (role: ROLE) => {
  return (request: FastifyRequest, reply: FastifyReply) => {
    if (request.user.role !== role) {
      return reply.status(403).send("Usuário não permissão");
    }
  };
};
