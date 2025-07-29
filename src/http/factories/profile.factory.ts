import { UserRepository } from "../repositories/prisma";
import { ProfileService } from "../services/profile/profile-service";

export const profileFactory = () => new ProfileService(new UserRepository());
