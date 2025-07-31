import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { validateCheckInFactory } from "../../factories";

export const validate = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const checkInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = checkInParamsSchema.parse(request.params);

  const validateCheckInService = validateCheckInFactory();

  await validateCheckInService.handle({
    checkInId,
  });

  return reply.status(204).send();
};
