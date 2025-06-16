import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserExistError } from "../../config/errors";
import { userFactory } from '../factories';

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
    const registerUserService = userFactory();

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
