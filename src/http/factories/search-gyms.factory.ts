import { PrismaGymRepository } from "../repositories/prisma/gyms.repository";
import { SearchGymsService } from "../services/search-gyms/search-gyms.service";

export const searchGymsFactory = () =>
  new SearchGymsService(new PrismaGymRepository());
