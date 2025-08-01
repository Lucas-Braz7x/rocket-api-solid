import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { gymFactory } from "../../factories";

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const createBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { title, description, phone, latitude, longitude } =
    createBodySchema.parse(request.body);

  const gymService = gymFactory();

  const { gym } = await gymService.handle({
    title,
    description,
    phone,
    latitude,
    longitude,
  });

  return reply.status(200).send({ gym });
};
