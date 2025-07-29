import { PrismaCheckInRepository } from "../repositories/prisma/check-in.repository";
import { FetchUserCheckInsHistoryService } from "../services/fetch-user-check-ins-hitsory/fetch-user-check-ins-hitsory.service";

export const fetchUserCheckInsHistoryFactory = () =>
  new FetchUserCheckInsHistoryService(new PrismaCheckInRepository());
