import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { searchGymsFactory } from "../../factories";

export const search = async (request: FastifyRequest, reply: FastifyReply) => {
  const searchBodySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { query, page } = searchBodySchema.parse(request.query);

  const searchGymsService = searchGymsFactory();

  const { gyms } = await searchGymsService.handle({ query, page });

  return reply.status(200).send({ gyms });
};
