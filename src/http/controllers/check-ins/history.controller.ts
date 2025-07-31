import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { fetchUserCheckInsHistoryFactory } from "../../factories";

export const history = async (request: FastifyRequest, reply: FastifyReply) => {
  const historyBodySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = historyBodySchema.parse(request.query);

  const fetchUserCheckInsHistoryService = fetchUserCheckInsHistoryFactory();

  const { checkIns } = await fetchUserCheckInsHistoryService.handle({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({ checkIns });
};
