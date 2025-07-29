import { PrismaCheckInRepository } from "../repositories/prisma/check-in.repository";
import { ValidateCheckInService } from "../services/validade-check-in/validade-check-in.service";

export const validateCheckInFactory = () =>
  new ValidateCheckInService(new PrismaCheckInRepository());
