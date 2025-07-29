import { PrismaCheckInRepository } from "../repositories/prisma/check-in.repository";
import { PrismaGymRepository } from "../repositories/prisma/gyms.repository";
import { CheckInService } from "../services/check-in/check-in.service";

export const checkInFactory = () =>
  new CheckInService(new PrismaCheckInRepository(), new PrismaGymRepository());
