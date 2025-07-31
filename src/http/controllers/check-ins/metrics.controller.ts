import type { FastifyReply, FastifyRequest } from "fastify";
import { metricsFactory } from "../../factories";

export const metrics = async (request: FastifyRequest, reply: FastifyReply) => {
  const metricsService = metricsFactory();

  const { checkInsCount } = await metricsService.handle({
    userId: request.user.sub,
  });

  return reply.status(200).send({ checkInsCount });
};
