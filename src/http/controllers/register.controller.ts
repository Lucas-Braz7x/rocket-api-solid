import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { registerUserService } from "../services/user.service";

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
    await registerUserService({
      name,
      email,
      password,
    });
  } catch (error) {
    return reply.status(409).send();
  }

  return reply.status(201).send();
};
