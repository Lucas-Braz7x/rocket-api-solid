import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { checkInFactory, gymFactory } from "../../factories";

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const checkInParamsSchema = z.object({
    gymId: z.string().uuid(),
  });
  const createBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = createBodySchema.parse(request.body);

  const { gymId } = checkInParamsSchema.parse(request.params);

  const checkInService = checkInFactory();

  await checkInService.handle({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(201).send();
};
