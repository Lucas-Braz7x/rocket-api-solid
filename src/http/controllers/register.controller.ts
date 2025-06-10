import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { RegisterUserService } from "../services/user.service";
import { UserRepository } from "../repositories/prisma";
import { UserExistError } from "../services/errors";

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerUserService = new RegisterUserService(new UserRepository());

    await registerUserService.handle({
      name,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof UserExistError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
};
