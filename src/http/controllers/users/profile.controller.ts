import type { FastifyReply, FastifyRequest } from "fastify";
import { profileFactory } from "../../factories";

export const profile = async (request: FastifyRequest, reply: FastifyReply) => {
  const getUserProfile = profileFactory();

  const { user } = await getUserProfile.handle({ userId: request.user.sub });

  return reply.status(200).send({ ...user, password_hash: undefined });
};
