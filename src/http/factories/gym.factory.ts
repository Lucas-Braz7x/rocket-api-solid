import { PrismaGymRepository } from "../repositories/prisma/gyms.repository";
import { GymService } from "../services/gym/gym.service";

export const gymFactory = () => new GymService(new PrismaGymRepository());
