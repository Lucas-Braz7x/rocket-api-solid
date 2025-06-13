import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AuthService } from "@/http/services/auth/auth.service";
import { UserRepository } from "../repositories/prisma";
import { InvalidCredentialsError } from "../../config/errors";

export const auth = async (request: FastifyRequest, reply: FastifyReply) => {
  const authBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authBodySchema.parse(request.body);

  try {
    const authService = new AuthService(new UserRepository());

    await authService.handle({
      email,
      password,
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(200).send();
};
