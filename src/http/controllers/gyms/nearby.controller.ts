import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { fetchNearbyGymsFactory, searchGymsFactory } from "../../factories";

export const nearby = async (request: FastifyRequest, reply: FastifyReply) => {
  const nearbyBodySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nearbyBodySchema.parse(request.query);

  const fetchNearbyGymsService = fetchNearbyGymsFactory();

  const { gyms } = await fetchNearbyGymsService.handle({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(200).send({ gyms });
};
