import { PrismaGymRepository } from "../repositories/prisma/gyms.repository";
import { FetchNearbyGymsService } from "../services/fetch-nearby-gyms/fetch-nearby-gyms.service";

export const fetchNearbyGymsFactory = () =>
  new FetchNearbyGymsService(new PrismaGymRepository());
